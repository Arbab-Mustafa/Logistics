import prisma from "@/lib/db";
import  Logs from "@/logs/Logs";

export default async function DeleteOtp() {
     // Get all records
            const records = await prisma.verification.findMany();
            const now = new Date();
            
            // Calculate minutes difference and find IDs to delete
            const idsToDelete = records
              .filter(record => {
                const createdAt = new Date(record.createdAt);
                const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
                return Math.abs(diffInMinutes) >= 10;
              })
              .map(record => record.Id);
    
            if (idsToDelete.length > 0) {
              const result = await prisma.verification.deleteMany({
                where: {
                  Id : {
                    in: idsToDelete
                  }
                }
              });
              Logs(`Cleaned up ${result.count} expired OTPs at ${now.toISOString()}`);
            }
}
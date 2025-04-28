import { NextResponse } from 'next/server';
import cron from 'node-cron';
import DeleteOtp from '@/jobs/DeleteOtp';

let cronJob: cron.ScheduledTask | null = null;

export async function POST() {
  if (cronJob) {
    return NextResponse.json(
      { message: 'Cleanup job already running' },
      { status: 400 }
    );
  }

  try {
    // Run every second using * * * * * *
    cronJob = cron.schedule('* * * * * *', async () => {
      try {
        DeleteOtp();

      } catch (error) {
        console.error('Cleanup error:', error);
      }
    });

    cronJob.start();

    return NextResponse.json(
      { message: 'Continuous cleanup started' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Failed to start cleanup:', error);
    return NextResponse.json(
      { message: 'Failed to start cleanup' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  if (!cronJob) {
    return NextResponse.json(
      { message: 'No cleanup job running' },
      { status: 400 }
    );
  }

  cronJob.stop();
  cronJob = null;
  return NextResponse.json(
    { message: 'Cleanup job stopped' },
    { status: 200 }
  );
}
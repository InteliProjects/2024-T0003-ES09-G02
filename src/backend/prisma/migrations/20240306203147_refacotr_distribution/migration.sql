-- AlterTable
ALTER TABLE "Distribution" ALTER COLUMN "answered" SET DEFAULT 0,
ALTER COLUMN "pendent" SET DEFAULT 0,
ALTER COLUMN "canceled_subscription" SET DEFAULT 0,
ALTER COLUMN "included" SET DEFAULT 0,
ALTER COLUMN "valid" SET DEFAULT 0,
ALTER COLUMN "sent" SET DEFAULT 0,
ALTER COLUMN "sent_at" DROP NOT NULL;

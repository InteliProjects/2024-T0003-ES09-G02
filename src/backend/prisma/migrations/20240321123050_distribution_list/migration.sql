-- CreateTable
CREATE TABLE "DistributionList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "distribution_id" TEXT NOT NULL,

    CONSTRAINT "DistributionList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DistributionList" ADD CONSTRAINT "DistributionList_distribution_id_fkey" FOREIGN KEY ("distribution_id") REFERENCES "Distribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

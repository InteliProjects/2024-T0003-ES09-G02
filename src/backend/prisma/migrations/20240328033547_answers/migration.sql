-- CreateTable
CREATE TABLE "Answers" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "finishTime" TIMESTAMP(3) NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "started" BOOLEAN NOT NULL,
    "answer" TEXT NOT NULL,
    "distribution_id" TEXT NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_distribution_id_fkey" FOREIGN KEY ("distribution_id") REFERENCES "Distribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

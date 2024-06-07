-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Research" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identifier" TEXT NOT NULL,
    "numberDistributions" INTEGER NOT NULL,
    "distributionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Research_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distribution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answered" INTEGER NOT NULL,
    "pendent" INTEGER NOT NULL,
    "anonymous_answer" BOOLEAN NOT NULL,
    "csv_file" TEXT NOT NULL,
    "canceled_subscription" INTEGER NOT NULL,
    "included" INTEGER NOT NULL,
    "valid" INTEGER NOT NULL,
    "sent" INTEGER NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "template" TEXT NOT NULL,
    "research_id" TEXT NOT NULL,

    CONSTRAINT "Distribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_research_id_fkey" FOREIGN KEY ("research_id") REFERENCES "Research"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

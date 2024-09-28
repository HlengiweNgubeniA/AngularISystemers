export interface SearchAuditDto {
    user: string,
    transactionType: string,
    date: Date | null,
}
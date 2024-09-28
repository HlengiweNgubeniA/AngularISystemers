export interface AuditTrail{
    user: string,
    actiontype: string,
    timestamp: Date,
    entityId: string,
    details: string,
}
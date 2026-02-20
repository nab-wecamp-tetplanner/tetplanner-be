import { TransactionType } from '../../helper/enums';
export declare class CreateBudgetTransactionDto {
    amount: number;
    type: TransactionType;
    note?: string;
    transaction_date: Date;
    tet_config_id: string;
    category_id: string;
    todo_item_id?: string;
}

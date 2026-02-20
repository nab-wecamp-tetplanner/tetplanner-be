import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
export declare class TimelinePhase {
    id: string;
    name: string;
    start_date: Date;
    end_date: Date;
    display_order: number;
    tet_config: TetConfig;
    todo_items: TodoItem[];
}

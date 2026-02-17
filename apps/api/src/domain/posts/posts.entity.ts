export class Posts {
    constructor(
        public readonly id: number | undefined,
        public readonly storeName: string,
        public readonly userId: string,
        public readonly score: number,
        public readonly comment: string | null,
        public readonly imageKey: string,
        public readonly created_at: Date,
    ){}
}
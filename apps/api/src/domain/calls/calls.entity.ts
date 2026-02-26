export class Calls {
    constructor(
        public readonly id: number | undefined,
        public readonly userId: string,
        public readonly title: string | null,
        public readonly ninniku: number | null,
        public readonly yasai: number | null,
        public readonly abura: number | null,
        public readonly karame: number | null,
    ) {}
}
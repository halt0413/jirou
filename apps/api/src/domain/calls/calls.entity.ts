export class Calls {
    constructor(
        public readonly id: number | undefined,
        public readonly userId: string,
        public readonly title: string,
        public readonly ninniku: number,
        public readonly yasai: number,
        public readonly abura: number,
        public readonly karame: number,
    ) {}
}
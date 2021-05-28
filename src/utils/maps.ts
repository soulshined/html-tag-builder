class Attributes extends Map<string, any> {

    clone(): Attributes {
        const clone = new Attributes();
        this.forEach((v: any, k: string) => clone.set(k, v));
        return clone;
    }

}
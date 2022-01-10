export interface Repository<E>{
    save(e : E) : Promise<E>;
    get(id:string) : Promise<E> | Promise<E[]>
}
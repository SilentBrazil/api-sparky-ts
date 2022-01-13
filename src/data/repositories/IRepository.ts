export interface IRepository<E>{
    save(e : E) : Promise<E>;
    get(ytId:string[]) : Promise<E[]>;
}

export interface IRepository<E>{
    save(e : E) : Promise<E>;
    get(ytId:string[] | string,limit?:number) : Promise<E[]>;
    update(e : E): Promise<E>;
}
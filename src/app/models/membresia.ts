export interface Membresia {
    id:number,
    plan:string,
    p_efectivo:number,
    p_qr:number,
    fecha_ini?: string | null,
    fecha_fin?: string | null,
    estado:string,
    detalle:string,
    disciplina:string,
    ext_ini?:string | null,
    ext_fin?:string | null,
    detalle_ext:string,
    user_id:number,
    created_at?:string
}

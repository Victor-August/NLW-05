import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

import { v4 as uuid } from "uuid";

@Entity("users")
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    //criando um Id único utilizando o tipo uuid v4 (random numbers) importados acima com o nome de "uuid"
    constructor() {
        if (!this.id) { //se este id não vier preenchido 
            this.id = uuid(); //chamar a função uuid
        }
    }
}

export { User }
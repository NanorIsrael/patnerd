import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
    name: 'accounts',
})
class AccountsEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: string

    @Column()
    email: string

    @Column({ name: 'password' })
    password: string
}
export default AccountsEntity

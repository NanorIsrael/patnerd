import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
    name: 'user_tokens',
})
class TokenEntity {
    @PrimaryGeneratedColumn({ name: 'session_id' })
    session_id: string

    @Column({ name: 'reset_token' })
    reset_token: string

    @Column({ name: 'account_id' })
    account_id: string
}
export default TokenEntity

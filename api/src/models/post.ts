import {
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'posts',
})
export class Post extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  // Global logical timestamp (serialization authority)
  @Unique
  @Index
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare sequenceId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare platform: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare content: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare desiredTime: Date;

  @Default('PENDING')
  @Column({
    type: DataType.ENUM('PENDING', 'PUBLISHED', 'FAILED'),
    allowNull: false,
  })
  declare status: 'PENDING' | 'PUBLISHED' | 'FAILED';

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare publishedAt?: Date;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;

  @DeletedAt
  @Column(DataType.DATE)
  declare deletedAt: Date;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserCourse } from './userCourse.schema';
export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop()
		firstName: string;
	@Prop()
		lastName: string;
	@Prop()
		email: string;
	@Prop()
		name: string;
	@Prop()
		password: string;
	@Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]})
		courses: UserCourse[];
}

export const UserSchema = SchemaFactory.createForClass(User);
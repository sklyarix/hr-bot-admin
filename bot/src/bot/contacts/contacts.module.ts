import { Module } from '@nestjs/common';
import { ContactsHears } from './contacts.hears';

@Module({
  imports: [],
  providers: [ContactsHears],
  exports: [],
})
export class ContactsModule {}

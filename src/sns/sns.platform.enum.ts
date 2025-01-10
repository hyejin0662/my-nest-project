import { registerEnumType } from '@nestjs/graphql';


export enum Platform {
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  TWITTER = 'TWITTER',
  X = 'X',
}
// swagger 보여주는 용도
registerEnumType(Platform, {
  name: 'Platform',
  description: 'Supported SNS platforms',
});

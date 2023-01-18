import { Module } from '@nestjs/common';
import { HashProvider } from './HashProvider/hash.provider';
import { HashProviderProps } from './HashProvider/types/hash.provider';

@Module({
  providers: [
    {
      provide: HashProviderProps,
      useClass: HashProvider,
    },
  ],
  exports: [HashProviderProps],
})
export class ProviderModule {}

import { utils } from '@roxavn/core';
import { visitFiles, getPackageRootPath } from '@roxavn/core/server';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

class CompressService {
  run({ quality = 60 }: { quality?: number }) {
    const root = getPackageRootPath();
    visitFiles(path.join(root, 'static'), async (filePath: string) => {
      let out: Buffer | undefined;
      if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
        out = await sharp(filePath)
          .jpeg({ mozjpeg: true, quality, force: true })
          .toBuffer();
      } else if (filePath.endsWith('.png')) {
        out = await sharp(filePath)
          .png({ compressionLevel: 6, quality })
          .toBuffer();
      }
      if (out) {
        const oldSize = fs.statSync(filePath).size;
        const newSize = out.length;
        fse.writeFileSync(filePath, out);
        const reduce = utils.Number.formatPercent(
          (newSize - oldSize) / oldSize
        );
        console.log(
          `[${reduce.padStart(6, ' ')}] ${filePath.slice(
            root.length
          )} ${utils.Number.abbreviate(oldSize)} => ${utils.Number.abbreviate(
            newSize
          )}`
        );
      }
    });
  }
}

export const compressService = new CompressService();

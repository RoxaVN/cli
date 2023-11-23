import { utils } from '@roxavn/core';
import { visitFiles, getPackageRootPath } from '@roxavn/core/server';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

class CompressService {
  run({
    quality = 60,
    threshold = 0.1,
    source,
  }: {
    quality?: number;
    threshold?: number;
    source?: string;
  }) {
    const root = getPackageRootPath();
    visitFiles(
      source || path.join(root, 'static'),
      async (filePath: string) => {
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
          const compressionRatio = (oldSize - newSize) / oldSize;
          let compressionText = '';
          if (compressionRatio > threshold) {
            fse.writeFileSync(filePath, out);
            compressionText = utils.Number.formatPercent(-compressionRatio);
          }
          console.log(
            `[${compressionText.padStart(6, ' ')}] ${
              filePath.startsWith(root) ? filePath.slice(root.length) : filePath
            } ${utils.Number.abbreviate(oldSize)} => ${utils.Number.abbreviate(
              newSize
            )}`
          );
        }
      }
    );
  }
}

export const compressService = new CompressService();

import { Injectable } from '@nestjs/common';
import { FileDTO } from './dtos/file.dto';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {

    async upload(file: FileDTO) {
        const supabaseURL = process.env.SUPABASE_DATABASE_URL;
        const supabaseKEY = process.env.SUPABASE_DATABASE_KEY;

        console.log(supabaseURL);
        console.log(supabaseKEY);

        const supabase = createClient(
            supabaseURL,
            supabaseKEY
        );

        const data = await supabase.storage.from('upload').upload(file.originalname, file.buffer, {
            upsert: true,
        });

        return data;
    }

}

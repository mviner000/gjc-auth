"use client";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const Simeon = () => {
    const cld = new Cloudinary({ cloud: { cloudName: 'dqpzvvd0v' } });
    return (
        <>
            <div className='flex w-full text-center justify-center'>
                <div className='text-center justify-center  '>
                    <AdvancedImage
                        style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                        cldImg={cld.image(`static/about/gen_simeon_nxkpxq`)
                            .quality('auto')
                            .resize(auto().width(520).height(520))
                        }
                    />

                </div>
            </div>

        </>
    );
};

export default Simeon;
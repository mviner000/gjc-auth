"use client";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const TechImages = () => {
    const cld = new Cloudinary({ cloud: { cloudName: 'dqpzvvd0v' } });
    return (
        <>
            <div className="grid grid-cols-6 text-center justify-center gap-3 mt-5">
                <div className='flex w-full text-center justify-center'>
                    <div className='text-center justify-center  '>
                        <AdvancedImage
                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            cldImg={cld.image(`tech_used/django_k445op`)
                                .quality('auto')
                                .resize(auto().width(100).height(100))
                            }
                        />
                        <div className='mt-3 text-center justify-center'>Python Django</div>
                    </div>
                </div>


                <div className='flex w-full text-center justify-center'>
                    <div className='text-center justify-center  '>
                        <AdvancedImage
                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            cldImg={cld.image(`tech_used/nextjs_lldmwo`)
                                .quality('auto')
                                .resize(auto().width(100).height(100))
                            }
                        />

                        <div className='mt-3 text-center justify-center'>NextJs</div>

                    </div>
                </div>

                <div className='flex w-full text-center justify-center'>
                    <div className='text-center justify-center  '>
                        <AdvancedImage
                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            cldImg={cld.image(`tech_used/drizzle_yrhnlr`)
                                .quality('auto')
                                .resize(auto().width(100).height(100))
                            }
                        />
                        <div className='mt-3 text-center justify-center'>drizzle</div>

                    </div>
                </div>

                <div className='flex w-full text-center justify-center'>
                    <div className='text-center justify-center  '>
                        <AdvancedImage
                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            cldImg={cld.image(`tech_used/tailwind_sbdjup`)
                                .quality('auto')
                                .resize(auto().width(100).height(100))
                            }
                        />
                        <div className='mt-3 text-center justify-center'>Tailwind</div>

                    </div>
                </div>
                <div className='flex w-full text-center justify-center'>
                    <div className='text-center justify-center  '>
                        <AdvancedImage
                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            cldImg={cld.image(`tech_used/cloudinary_c2ge8u`)
                                .quality('auto')
                                .resize(auto().width(100).height(100))
                            }
                        />
                        <div className='mt-3 text-center justify-center'>Cloudinary</div>

                    </div>
                </div>
                <div className='flex w-full text-center justify-center'>
                    <div className='text-center justify-center  '>
                        <AdvancedImage
                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            cldImg={cld.image(`tech_used/resend_jcdhdr`)
                                .quality('auto')
                                .resize(auto().width(100).height(100))
                            }
                        />
                        <div className='mt-3 text-center justify-center'>Resend</div>

                    </div>
                </div>


            </div>
        </>
    );
};

export default TechImages;
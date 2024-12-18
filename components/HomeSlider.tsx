import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

import DashboardCSS from '../style/Home.module.css';

const HomeSlider = () => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className=''>

            <Slider {...settings}>

                <div className={`w-full px-2 hover:cursor-pointer ${DashboardCSS.carslImgContainer}`}>

                    <div className={`${DashboardCSS.carslImgContainer}`} style={{ borderRadius: '8px' }}>
                        <figure><img src="https://img.freepik.com/free-photo/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge_1258-150755.jpg?t=st=1726890574~exp=1726894174~hmac=8a24f6b67272c9981dc9e9bcd92c713e5c1185d96e2a7c9fb611135a80ebb548&w=1380" alt="Product Image" className='w-full h-[calc(100vh-96px)]' /></figure>
                    </div>

                </div>

                
                <div className={`w-full px-2 hover:cursor-pointer ${DashboardCSS.carslImgContainer}`}>

                    <div className={`${DashboardCSS.carslImgContainer}`} style={{ borderRadius: '8px' }}>
                        <figure><img src="https://img.freepik.com/free-photo/view-3d-house-model_23-2150761014.jpg?t=st=1726894132~exp=1726897732~hmac=b8bfa02828406b8d0ca11cf4b6ed672a55e2ad50408e4b4983b6888486498c49&w=1380" alt="Product Image" className='w-full h-[calc(100vh-96px)]' /></figure>
                    </div>

                </div>


                <div className={`w-full px-2 hover:cursor-pointer ${DashboardCSS.carslImgContainer}`}>

                    <div className={`${DashboardCSS.carslImgContainer}`} style={{ borderRadius: '8px' }}>
                        <figure><img src="https://img.freepik.com/free-photo/landscape-sunset-architectural-matrix-stunning-modern-villa-with-swimming-pool_1409-5155.jpg?t=st=1726894205~exp=1726897805~hmac=8745bad1f320ea91a51144590aa0d7f712524ad27c7589cff619dfc8908f6f23&w=1380" alt="Product Image" className='w-full h-[calc(100vh-96px)]' /></figure>
                    </div>

                </div>


                <div className={`w-full px-2 hover:cursor-pointer ${DashboardCSS.carslImgContainer}`}>

                    <div className={`${DashboardCSS.carslImgContainer}`} style={{ borderRadius: '8px' }}>
                        <figure><img src="https://img.freepik.com/free-photo/medium-shot-man-working-as-real-estate-agent_23-2151065039.jpg?t=st=1726894211~exp=1726897811~hmac=cf94f7e90d1b975e6c26e5ed2fc8e00e896ba7004e55dda1415152e72a55863b&w=996" alt="Product Image" className='w-full h-[calc(100vh-96px)]' /></figure>
                    </div>

                </div>



            </Slider>
        </div>
    );
};

export default HomeSlider;



{/* <div
    style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '50%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
        zIndex: '2',
    }}
></div> */}
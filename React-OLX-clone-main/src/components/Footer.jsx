import React from "react";

const Footer = () => {
    return (
        <div className="bg-cyan-950 p-4">
            {/* Logo Section */}
            <div className="flex flex-wrap justify-center gap-6 lg:justify-evenly">
                <img
                    src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade_tech.svg?v=1"
                    alt="CarTrade Tech"
                    className="h-16 cursor-pointer"
                />
                <img
                    src="https://statics.olx.in/external/base/img/cartrade/logo/olx.svg?v=1"
                    alt="OLX"
                    className="w-28 h-12 cursor-pointer"
                />
                <img
                    src="https://statics.olx.in/external/base/img/cartrade/logo/carwale.svg?v=1"
                    alt="CarWale"
                    className="w-28 h-12 cursor-pointer"
                />
                <img
                    src="https://statics.olx.in/external/base/img/cartrade/logo/bikewale.svg?v=1"
                    alt="BikeWale"
                    className="w-28 h-12 cursor-pointer"
                />
                <img
                    src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade.svg?v=1"
                    alt="CarTrade"
                    className="w-28 h-12 cursor-pointer"
                />
                <img
                    src="https://statics.olx.in/external/base/img/cartrade/logo/mobility.svg?v=1"
                    alt="Mobility"
                    className="w-28 h-12 cursor-pointer"
                />
            </div>

            {/* Footer Links and Copyright */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white mt-4">
                <section className="cursor-pointer">Help - Sitemap</section>
                <section className="text-center sm:text-right">
                    All rights reserved © 2006-2025 OLX
                </section>
            </div>
        </div>
    );
};

export default Footer;

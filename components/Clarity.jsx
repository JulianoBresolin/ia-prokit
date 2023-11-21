"use client";
import Script from "next/script";

export default function Clarity() {
    return (
        <>
            <Script id="clarity-script" strategy="afterInteractive">
                {`
                    if (!window.clarity) {
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.id=i;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "ju4wl9vra7");
                    }
                `}
            </Script>
        </>
    );
}
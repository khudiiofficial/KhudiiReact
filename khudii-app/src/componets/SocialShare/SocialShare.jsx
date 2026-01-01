// import { useState } from 'react';
// import { Facebook, Twitter, Linkedin, MessageCircle, Link, Mail } from 'lucide-react';
// import './SocialShare.css';

// const SocialShare = () => {
//     const [copied, setCopied] = useState(false);

//     // Get current page URL and title
//     const currentUrl = window.location.href;
//     const pageTitle = document.title || 'Check this out!';

//     const shareLinks = {
//         facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
//         // twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}`,
//         // linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
//         whatsapp: `https://wa.me/?text=${encodeURIComponent(pageTitle + ' ' + currentUrl)}`,
//         email: `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(currentUrl)}`
//     };

//     const handleShare = (platform) => {
//         const url = shareLinks[platform];
//         if (url) {
//             window.open(url, '_blank', 'width=600,height=400');
//         }
//     };

//     const copyToClipboard = async () => {
//         try {
//             await navigator.clipboard.writeText(currentUrl);
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//         } catch (err) {
//             console.error('Failed to copy:', err);
//         }
//     };

//     return (
//         <div className="social-share-sidebar">
//             {/* Facebook */}
//             <button
//                 className="share-icon-btn facebook"
//                 onClick={() => handleShare('facebook')}
//                 aria-label="Share on Facebook"
//                 title="Share on Facebook"
//             >
//                 <Facebook size={20} />
//             </button>

            
           

//             {/* WhatsApp */}
//             <button
//                 className="share-icon-btn whatsapp"
//                 onClick={() => handleShare('whatsapp')}
//                 aria-label="Share on WhatsApp"
//                 title="Share on WhatsApp"
//             >
//                 <MessageCircle size={20} />
//             </button>

//             {/* Email */}
//             <button
//                 className="share-icon-btn email"
//                 onClick={() => handleShare('email')}
//                 aria-label="Share via Email"
//                 title="Share via Email"
//             >
//                 <Mail size={20} />
//             </button>

//             {/* Copy Link */}
//             <button
//                 className={`share-icon-btn copy-link ${copied ? 'copied' : ''}`}
//                 onClick={copyToClipboard}
//                 aria-label="Copy link"
//                 title={copied ? 'Copied!' : 'Copy Link'}
//             >
//                 <Link size={20} />
//             </button>
//         </div>
//     );
// };



// //  <button
// //                 className="share-icon-btn twitter"
// //                 onClick={() => handleShare('twitter')}
// //                 aria-label="Share on Twitter"
// //                 title="Share on Twitter"
// //             >
// //                 <Twitter size={20} />
// //             </button>

          
// //             <button
// //                 className="share-icon-btn linkedin"
// //                 onClick={() => handleShare('linkedin')}
// //                 aria-label="Share on LinkedIn"
// //                 title="Share on LinkedIn"
// //             >
// //                 <Linkedin size={20} />
// //             </button>
// export default SocialShare;

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, MessageCircle, Link, Mail, Youtube, Instagram, Music2 } from 'lucide-react';
import './SocialShare.css';

const SocialShare = () => {
    const [copied, setCopied] = useState(false);

    const currentUrl = window.location.href;
    const pageTitle = document.title || 'Check this out!';

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(pageTitle + ' ' + currentUrl)}`,
        email: `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(currentUrl)}`,
        youtube: `https://www.youtube.com/@khudiiofficial`,   // 🔹 No direct share support → open platform
        instagram: `https://www.instagram.com/@khudiiofficial`,  // 🔹 Opens Instagram
        tiktok: `https://www.tiktok.com/@khudiiofficial`,       // 🔹 Opens TikTok
    };

    const handleShare = (platform) => {
        const url = shareLinks[platform];
        if (url) {
            window.open(url, '_blank', 'width=600,height=400');
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="social-share-sidebar">
            {/* Facebook */}
            <button
                className="share-icon-btn facebook"
                onClick={() => handleShare('facebook')}
                aria-label="Share on Facebook"
                title="Share on Facebook"
            >
                <Facebook size={20} />
            </button>

            {/* WhatsApp */}
            <button
                className="share-icon-btn whatsapp"
                onClick={() => handleShare('whatsapp')}
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
            >
                <MessageCircle size={20} />
            </button>

            {/* Email */}
            <button
                className="share-icon-btn email"
                onClick={() => handleShare('email')}
                aria-label="Share via Email"
                title="Share via Email"
            >
                <Mail size={20} />
            </button>

            {/* YouTube */}
            <button
                className="share-icon-btn youtube"
                onClick={() => handleShare('youtube')}
                aria-label="Open YouTube"
                title="YouTube"
            >
                <Youtube size={20} />
            </button>

            {/* Instagram */}
            <button
                className="share-icon-btn instagram"
                onClick={() => handleShare('instagram')}
                aria-label="Open Instagram"
                title="Instagram"
            >
                <Instagram size={20} />
            </button>

            {/* TikTok */}
            <button
                className="share-icon-btn tiktok"
                onClick={() => handleShare('tiktok')}
                aria-label="Open TikTok"
                title="TikTok"
            >
                <Music2 size={20} />
            </button>

            {/* Copy Link */}
            <button
                className={`share-icon-btn copy-link ${copied ? 'copied' : ''}`}
                onClick={copyToClipboard}
                aria-label="Copy link"
                title={copied ? 'Copied!' : 'Copy Link'}
            >
                <Link size={20} />
            </button>
        </div>
    );
};

export default SocialShare;

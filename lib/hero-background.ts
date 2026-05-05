/** Desktop hero uses YouTube (Cloudinary hero MP4 URL returns 404). Optional NEXT_PUBLIC_HERO_YOUTUBE_ID. */

const DEFAULT_ID = "XTS2Kw1yzds";

function sanitizeYoutubeId(raw: string): string | null {
    const id = raw.trim();
    return /^[\w-]{11}$/.test(id) ? id : null;
}

export function getHeroDesktopYoutubeId(): string {
    return sanitizeYoutubeId(process.env.NEXT_PUBLIC_HERO_YOUTUBE_ID ?? "") ?? DEFAULT_ID;
}

export function heroDesktopYoutubeEmbedSrc(videoId: string): string {
    const params = new URLSearchParams({
        autoplay: "1",
        mute: "1",
        controls: "0",
        playsinline: "1",
        loop: "1",
        playlist: videoId,
        rel: "0",
        modestbranding: "1",
        iv_load_policy: "3",
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

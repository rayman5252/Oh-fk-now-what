/* ==========================================================================
   VIDEOS — edit this file to add / remove episodes.
   No other file needs to change.

   HOW TO ADD A VIDEO:
   1. Copy a block below (the part between the { and the matching }).
   2. Paste the full URL into "url" — YouTube or Vimeo both work:
        https://www.youtube.com/watch?v=XXXXXXXXXXX
        https://youtu.be/XXXXXXXXXXX
        https://vimeo.com/XXXXXXXXXX
        https://vimeo.com/XXXXXXXXXX/XXXXXXXXXX (private/unlisted link)
   3. Set "title" and (optionally) "description".
   4. Save the file, commit, and push — Vercel will redeploy automatically.

   Leave the array empty ( VIDEOS = []; ) and the site will show a friendly
   "episodes coming soon" placeholder instead of broken video boxes.
   ========================================================================== */

const VIDEOS = [
   {
      title: "Ep. 2: The Mighty Ruthie — Ruthie Bolton",
      url: "https://youtu.be/XCwV9wQgkCo",
      description: "Two-time Olympic gold medalist, WNBA star, Army officer and Hall of Famer Ruthie Bolton sits down with her old Sydney 2000 teammate Kara to talk about life after the final buzzer.",
   },
   {
      title: "Ep. 1: Kelly Schumacher",
      url: "https://youtu.be/hwiQcZPPDNE",
      description: "The premiere episode: Kara sits down with Kelly Schumacher.",
   },
   {
          title: "Coming soon",
    url: "https://youtu.be/TAFv2dpKN88?si=mM7fDKKlY62c0fZK",          
      description: "",
   },
   {
      title: "Episode 1 teaser",
      url: "https://youtu.be/8dj7DKHd-C4?si=TERhh833hyOHHBlJ",
      description: "",
   },
   {
      title: "Episode 2 teaser",
      url: "https://youtu.be/ey2lmssG6Lk?si=eg0VqSx_E5BVmN3y",
      description: "",
   },
     // Example — delete or edit once you have a real episode:
     // {
     //   title: "Episode 1: Oh F*ck, Now What?",
     //   url: "https://youtu.be/qQOwH4bnCno?si=70S_fVfp2rAuf73",
     //   description: "KARA SAVES MEXICO."
     // },
   ];

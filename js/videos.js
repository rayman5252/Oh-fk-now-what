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
          title: "New Episode",
          url: "https://vimeo.com/1215054447/73eb314c0a",
          description: "",
   },
     // Example — delete or edit once you have a real episode:
     // {
     //   title: "Episode 1: Oh F*ck, Now What?",
     //   url: "https://youtu.be/qQOwH4bnCno?si=70S_fVfp2rAuf73",
     //   description: "KARA SAVES MEXICO."
     // },
   ];

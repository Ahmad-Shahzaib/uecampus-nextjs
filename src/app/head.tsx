export default function Head() {
  return (
    <>
      {/* Preconnect / preloads that should be in head can be added here */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
            try {
              // defer Next.js generated css links that live under /_next/static/css/
              var links = document.querySelectorAll('link[rel="stylesheet"][href*="/_next/static/css/"]');
              for (var i = 0; i < links.length; i++) {
                var l = links[i];
                if (l.dataset.deferred) continue;
                l.dataset.deferred = 'true';
                l.media = 'print';
                l.onload = function() { this.media = 'all'; };
              }
            } catch (e) {}
          })();`,
        }}
      />
    </>
  );
}

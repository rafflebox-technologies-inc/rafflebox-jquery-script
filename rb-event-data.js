$.noConflict();

jQuery(document).ready(function () {
  // Configuration
  var eventID;
  var raffleShortlink = 'gralaska';

  if (raffleShortlink) {
    // Retrieve Event information
    jQuery
      .get(
        'https://apic.rafflebox.ca/event-service/v2/events/' + raffleShortlink,
        function (data) {
          // Get JSON
          var event = data.data.data;

          // Format data
          eventID = event.id;
          var eventName = event.name;
          var jackpot = '$' + event.displayJackpotCents / 100;
          var jackpotHalf = '$' + event.displayJackpotCents / 100 / 2;
          var drawDate = new Date(event.drawDate).toLocaleDateString('en-US', {
            dateStyle: 'long',
          });
          var checkoutLink =
            'https://checkout.rafflebox.us/goldrush?eventId=' +
            eventID +
            '&locale=en';

          // Inject data
          jQuery('#eventName').text(eventName);
          jQuery('#jackpot-total').text(jackpot);
          jQuery('#jackpot-half').text(jackpotHalf);
          jQuery('#draw-date').text(drawDate);
          jQuery('#eventId').text(eventID);
          jQuery('.rb-checkout').attr('href', checkoutLink);
        }
      )
      // Then retrieve Recent Purchasers
      .done(function (data) {
        if (eventID) {
          jQuery.get(
            'https://apic.rafflebox.ca/event-service/v2/events/' +
              eventID +
              '/recent-purchases',
            function (data) {
              var purchasers = data.data.data;
              var count = 1;

              // Loop and format data
              for (const recentPurchase of purchasers) {
                if (
                  recentPurchase.date &&
                  recentPurchase.name &&
                  recentPurchase.totalDollars
                ) {
                  var purchased = null;
                  purchased = new Date(recentPurchase.date);
                  purchased = timeSince(purchased);

                  // Inject data
                  jQuery('#recent-' + count + '-name').text(
                    recentPurchase.name
                  );
                  jQuery('#recent-' + count + '-value').text(
                    '$' + recentPurchase.totalDollars
                  );
                  jQuery('#recent-' + count + '-date').text(purchased);

                  count++;
                }
              }
            }
          );
        }
      });
  }

  // Interval constants for time display
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  // Basic natural language time reporting
  function timeSince(date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find((i) => i.seconds <= seconds);
    const count =
      interval.seconds >= 60 ? Math.floor(seconds / interval.seconds) : 0;
    return count > 0
      ? `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`
      : 'moments ago';
  }
});

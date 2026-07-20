/**
 * Aryabhat Foundation — Event Request relay
 * ------------------------------------------
 * Receives a JSON POST from aryabhat.org/request.html and files it as a real
 * response on the "Request for conducting an Astronomical Event" Google Form.
 * Needed because the form enforces invisible reCAPTCHA on direct submissions,
 * which a cross-origin fetch cannot satisfy.
 *
 * SETUP (one time, ~3 minutes):
 *  1. Open the Google Form in EDIT mode (as its owner).
 *  2. Three-dot menu (top right) -> "Script editor" (Apps Script).
 *  3. Delete any placeholder code, paste this entire file, save (Ctrl/Cmd+S).
 *  4. Click "Deploy" -> "New deployment" -> gear icon -> "Web app".
 *       - Execute as:            Me
 *       - Who has access:        Anyone
 *  5. Click Deploy, authorize when prompted, and copy the Web app URL
 *     (ends in /exec). Paste that URL into request.html as SCRIPT_URL.
 *
 * NOTE: if you later edit this script, use Deploy -> "Manage deployments" ->
 * pencil icon -> Version: "New version" -> Deploy, or the live URL keeps
 * running the old code.
 */

// Form item IDs (from the live form structure).
var ITEMS = {
  org: 359969936,          // text: Name and Address of the host organisation
  contactName: 467099111,  // text: Contact person's name and designation
  mobile: 1971441792,      // text: Contact person's Mobile number
  status: 155999073,       // multiple choice: Status of the host organisation
  quiz: 1774798023,        // text: quiz participation (MP schools section)
  eventMP: 1950443442,     // multiple choice: event (MP schools section)
  eventBhopal: 591716268,  // multiple choice: event (Bhopal section)
  eventOutside: 770405470, // multiple choice: event (outside-Bhopal section)
  date1: 1535114479,       // date: Choice 1
  date2: 1335715049,       // date: Choice 2
  date3: 955522566,        // date: Choice 3
  beneficiaries: 703844770,// text: Expected number of beneficiaries
  message: 1354051433,     // paragraph: Message
  declaration: 1612834933  // checkbox: Declaration
};

var OTHER_CHOICE = 'Other activity (Please specify in message)';

var EVENT_ITEM_BY_STATUS = {
  'School in Madhya Pradesh': 'eventMP',
  'College / Other organisation situated in Bhopal': 'eventBhopal',
  'Organisation situated outside Bhopal': 'eventOutside'
};

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var form = FormApp.getActiveForm();

    var byId = {};
    form.getItems().forEach(function (it) { byId[it.getId()] = it; });
    function item(key) {
      var it = byId[ITEMS[key]];
      if (!it) throw new Error('Form item missing: ' + key);
      return it;
    }

    var resp = form.createResponse();

    resp.withItemResponse(item('org').asTextItem().createResponse(String(d.org || '')));
    resp.withItemResponse(item('contactName').asTextItem().createResponse(String(d.contact || '')));
    resp.withItemResponse(item('mobile').asTextItem().createResponse(String(d.mobile || '')));
    resp.withItemResponse(item('status').asMultipleChoiceItem().createResponse(String(d.status || '')));

    // Pick the event question that belongs to this organisation's branch.
    var eventKey = EVENT_ITEM_BY_STATUS[d.status];
    if (!eventKey) throw new Error('Unknown organisation status: ' + d.status);
    var eventItem = item(eventKey).asMultipleChoiceItem();
    var allowed = eventItem.getChoices().map(function (c) { return c.getValue(); });
    var eventValue = String(d.event || '');
    var message = String(d.message || '');
    if (allowed.indexOf(eventValue) === -1) {
      message = 'Requested activity: ' + eventValue + (message ? '\n' + message : '');
      eventValue = OTHER_CHOICE;
    }
    resp.withItemResponse(eventItem.createResponse(eventValue));

    if (d.status === 'School in Madhya Pradesh' && d.quiz !== undefined && d.quiz !== null && d.quiz !== '') {
      resp.withItemResponse(item('quiz').asTextItem().createResponse(String(d.quiz)));
    }

    ['date1', 'date2', 'date3'].forEach(function (key) {
      var v = String(d[key] || '');            // "YYYY-MM-DD"
      var p = v.split('-');
      if (p.length !== 3) throw new Error('Bad date for ' + key + ': ' + v);
      // Noon avoids any timezone edge shifting the stored day.
      var dt = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]), 12, 0, 0);
      resp.withItemResponse(item(key).asDateItem().createResponse(dt));
    });

    resp.withItemResponse(item('beneficiaries').asTextItem().createResponse(String(d.participants || '')));
    resp.withItemResponse(item('message').asParagraphTextItem().createResponse(message || 'No additional details.'));

    var declItem = item('declaration').asCheckboxItem();
    var declText = declItem.getChoices()[0].getValue();
    resp.withItemResponse(declItem.createResponse([declText]));

    resp.submit();

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Optional sanity check: open the /exec URL in a browser; should print OK. */
function doGet() {
  return ContentService.createTextOutput('Aryabhat event-request relay: OK');
}

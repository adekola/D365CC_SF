(() => {
  "use strict";
  (() => {
    class e {
      constructor() {
        (this.conversationStartTimes = {}), (this.callerNumbers = {});
      }
      initialize() {
        if (void 0 === window.sforce || void 0 === window.sforce.opencti) {
          const o = "/support/api/54.0/lightning/opencti.js",
            n = `${new URL(document.referrer).origin}${o}`;
          return e.loadScript(n);
        }
        return Promise.resolve(!0);
      }
      bindEvents() {
        var e, o;
        const n =
          null ===
            (o =
              null === (e = window.Microsoft) || void 0 === e
                ? void 0
                : e.CCaaS) || void 0 === o
            ? void 0
            : o.EmbedSDK;
        n &&
          (n.onConversationLoaded((e) => {
            console.log("Conversation loaded:", e);
            const { liveWorkItemId: o, customer: n } = e;
            (this.conversationStartTimes[o] = new Date()),
              (this.callerNumbers[o] =
                (null == n ? void 0 : n.phoneNumber) || "");
          }),
          n.onStatusChange((e) => {
            console.log("Status update received:", e);
            const { liveWorkItemId: o, statusCode: n } = e;
            if (5 === n || 4 === n) {
              const e = this.conversationStartTimes[o],
                n = new Date(),
                t = {
                  subject: "Call Summary",
                  callType: "Inbound",
                  callDurationInSeconds: Math.floor(
                    (n.getTime() - e.getTime()) / 1e3
                  ),
                  whoId: this.callerNumbers[o],
                  entityApiName: "Case",
                  id: "",
                };
              window.sforce.opencti.saveLog({
                value: t,
                callback: (e) => {
                  e.success
                    ? console.log("Log saved successfully:", e)
                    : console.error(
                        "Failed to save log:",
                        e.errors || "An unknown error occurred."
                      );
                },
              });
            }
          }));
      }
      static loadScript(e) {
        return new Promise((o, n) => {
          const t = document.createElement("script");
          (t.type = "text/javascript"),
            (t.async = !0),
            (t.src = e),
            (t.onload = function () {
              o(!0);
            }),
            (t.onerror = function () {
              n(new Error(`Error in loading ${e}`));
            }),
            document.getElementsByTagName("head")[0].appendChild(t);
        });
      }
    }
    (window.CCaaS = window.CCaaS || {}),
      window.CCaaS.CTIDriver || (window.CCaaS.CTIDriver = e);
  })();
})();

(() => {
  "use strict";
  var e = {
      185: function (e, o, n) {
        var t =
          (this && this.__awaiter) ||
          function (e, o, n, t) {
            return new (n || (n = Promise))(function (i, r) {
              function s(e) {
                try {
                  a(t.next(e));
                } catch (e) {
                  r(e);
                }
              }
              function c(e) {
                try {
                  a(t.throw(e));
                } catch (e) {
                  r(e);
                }
              }
              function a(e) {
                var o;
                e.done
                  ? i(e.value)
                  : ((o = e.value),
                    o instanceof n
                      ? o
                      : new n(function (e) {
                          e(o);
                        })).then(s, c);
              }
              a((t = t.apply(e, o || [])).next());
            });
          };
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.CUSTOMERDATAENUM = void 0),
          (o.conversationReady = function (e, n) {
            return t(this, void 0, void 0, function* () {
              return new Promise((i, d) =>
                t(this, void 0, void 0, function* () {
                  let i = window.sforce.opencti.CALL_TYPE.INBOUND;
                  n.msdyn_channel &&
                    ((Number(n.msdyn_channel) !== s.VOICE &&
                      Number(n.msdyn_channel) !== s.VOICE_CALL) ||
                      (n.msdyn_isoutbound &&
                        (i = window.sforce.opencti.CALL_TYPE.OUTBOUND)));
                  const { contactId: d, accountId: l } = yield (function (
                    e,
                    n
                  ) {
                    return t(this, void 0, void 0, function* () {
                      const i = new Set(),
                        s = new Set(),
                        d = yield (function (e, n) {
                          return t(this, void 0, void 0, function* () {
                            let t = [];
                            try {
                              return (
                                a(o.CUSTOMERDATAENUM.PHONENUMBER, e)
                                  ? (t = yield c(e.customerPhoneNumber, n))
                                  : a(o.CUSTOMERDATAENUM.NAME, e) &&
                                    (t = yield c(e.customerName, n)),
                                t
                              );
                            } catch (e) {
                              throw new Error(e);
                            }
                          });
                        })(e, n);
                      return (
                        d &&
                          d.forEach(({ id: e, type: o }) => {
                            o === r.CONTACT
                              ? i.add(e)
                              : o === r.ACCOUNT && s.add(e);
                          }),
                        {
                          contactId:
                            1 === i.size ? i.values().next().value : void 0,
                          accountId:
                            1 === s.size ? s.values().next().value : void 0,
                        }
                      );
                    });
                  })(e, i);
                  var u;
                  (d || l) &&
                    ((u = d || l),
                    new Promise((e, o) => {
                      window.sforce.opencti.screenPop({
                        type: window.sforce.opencti.SCREENPOP_TYPE.SOBJECT,
                        params: { recordId: u },
                        callback: (n) => {
                          n.success ? e(n.success) : o(n.errors);
                        },
                      });
                    }));
                })
              );
            });
          }),
          (o.onClickToDial = function (e) {
            window.sforce.opencti.enableClickToDial(),
              window.sforce.opencti.onClickToDial({
                listener: (o) => {
                  const n = { number: o.number };
                  e(n), (0, i.setSoftPhonePanelVisibility)(!0);
                },
              });
          }),
          (o.searchForRecords = c);
        const i = n(200);
        o.CUSTOMERDATAENUM = {
          PHONENUMBER: "customerPhoneNumber",
          EMAIL: "customerEmail",
          NAME: "customerName",
        };
        const r = { CONTACT: "Contact", ACCOUNT: "Account" },
          s = { VOICE_CALL: 19244e4, VOICE: 19237e4 };
        function c(e, o) {
          return t(this, void 0, void 0, function* () {
            return new Promise((n, t) => {
              window.sforce.opencti.searchAndScreenPop({
                searchParams: e,
                callType: o,
                deferred: !0,
                callback: (e) => {
                  const o = [];
                  if (e.success && e.returnValue) {
                    for (const [n, t] of Object.entries(e.returnValue))
                      !t ||
                        (t.RecordType !== r.CONTACT &&
                          t.RecordType !== r.ACCOUNT) ||
                        o.push({ id: n, type: t.RecordType });
                    n(o);
                  } else t(e.errors);
                },
              });
            });
          });
        }
        function a(e, o) {
          return void 0 !== o[e] && null !== o[e] && "" !== o[e];
        }
      },
      200: function (e, o, n) {
        var t =
          (this && this.__awaiter) ||
          function (e, o, n, t) {
            return new (n || (n = Promise))(function (i, r) {
              function s(e) {
                try {
                  a(t.next(e));
                } catch (e) {
                  r(e);
                }
              }
              function c(e) {
                try {
                  a(t.throw(e));
                } catch (e) {
                  r(e);
                }
              }
              function a(e) {
                var o;
                e.done
                  ? i(e.value)
                  : ((o = e.value),
                    o instanceof n
                      ? o
                      : new n(function (e) {
                          e(o);
                        })).then(s, c);
              }
              a((t = t.apply(e, o || [])).next());
            });
          };
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.setSoftPhonePanelVisibility = void 0),
          (o.embedSDKSampleUsage = function () {
            const e = window.Microsoft.CCaaS.EmbedSDK;
            e &&
              (e.conversation.onNotesAdded((e) => {
                console.log("Embed SDK New Note Created", e);
              }),
              e.conversation.onConversationLoaded((o) =>
                t(this, void 0, void 0, function* () {
                  console.log("Embed SDK Conversation Loaded", o), v(e);
                  const n = yield e.conversation.getConversationData(
                    o.liveWorkItemId,
                    ["msdyn_isoutbound", "msdyn_channel", "subject"]
                  );
                  yield (0, i.conversationReady)(o, n), a(e);
                })
              ),
              e.conversation.onTransfer((e) => {
                console.log("Embed SDK Conversation Transferred", e);
              }),
              e.conversation.onStatusChange((o) => {
                console.log("Embed SDK Conversation State Changed", o),
                  o.statusCode === c.Closed && d(e, o.liveWorkItemId);
              }),
              e.conversation.onNewMessage((e) => {
                console.log("Embed SDK New Message", e);
              }),
              e.conversation.onAccept((o) => {
                console.log("Embed SDK Conversation Accepted", o),
                  l(e),
                  u(e),
                  m(e, o.liveWorkItemId),
                  f(e, o.liveWorkItemId),
                  h(e, o.liveWorkItemId);
              }),
              e.conversation.onReject((e) => {
                console.log("Embed SDK Conversation Rejected", e);
              }),
              e.conversation.onConsultStart((e) => {
                console.log("Embed SDK Consult Started", e);
              }),
              e.conversation.onConsultEnd((e) => {
                console.log("Embed SDK Consult Ended", e);
              }),
              e.conversation.onCustomerSentimentChange((e) => {
                console.log("Embed SDK Customer Sentiment Changed", e);
              }),
              e.notification.onNewConversationNotification((e) => {
                console.log("Embed SDK New Conversation Notification", e);
              }),
              e.notification.onNewNotification((e) => {
                console.log("Embed SDK New Notification", e);
              }),
              e.presence.onPresenceChange((e) => {
                console.log("Embed SDK Agent Presence Changed", e);
              }),
              e.voiceOrVideoCalling.onHoldChange((e) => {
                console.log("Embed SDK Call hold changed", e);
              }),
              e.voiceOrVideoCalling.onMuteChange((e) => {
                console.log("Embed SDK Call mute changed", e);
              }),
              e.ctiDriver.onSoftPhonePanelHeightChange((e) => {
                S(e);
              }),
              e.ctiDriver.onSoftPhonePanelWidthChange((e) => {
                C(e);
              }),
              e.ctiDriver.onSoftPhonePanelVisibilityChange((e) => {
                (0, o.setSoftPhonePanelVisibility)(e);
              }),
              (0, i.onClickToDial)(e.ctiDriver.clickToDial));
          });
        const i = n(185);
        var r, s, c;
        !(function (e) {
          (e.AVAILABLE = "AVAILABLE"),
            (e.AWAY = "AWAY"),
            (e.BUSY = "BUSY"),
            (e.BUSY_DO_NOT_DISTURB = "BUSY_DO_NOT_DISTURB"),
            (e.OFFLINE = "OFFLINE");
        })(r || (r = {})),
          (function (e) {
            (e[(e.Success = 1)] = "Success"),
              (e[(e.Error = 2)] = "Error"),
              (e[(e.Warning = 3)] = "Warning"),
              (e[(e.Information = 4)] = "Information");
          })(s || (s = {})),
          (function (e) {
            (e[(e.Active = 2)] = "Active"),
              (e[(e.WrapUp = 5)] = "WrapUp"),
              (e[(e.Closed = 4)] = "Closed");
          })(c || (c = {}));
        const a = (e) => {
            e.presence
              .getPresence()
              .then((e) => {
                console.log("Embed SDK Agent's Current Presence:", e);
              })
              .catch((e) => {
                console.error(
                  "Embed SDK Failed to retrieve agent's presence status:",
                  e
                );
              }),
              e.presence
                .getPresenceOptions()
                .then((o) => {
                  console.log("Embed SDK Available Presence Options:", o);
                  const n = o.find(
                    (e) => e.basePresenceStatus === r.BUSY_DO_NOT_DISTURB
                  );
                  n
                    ? e.presence
                        .setPresence(n.presenceId)
                        .then(() => {
                          console.log(
                            "Embed SDK Agent's presence status has been updated to 'busyDND'."
                          );
                        })
                        .catch((e) => {
                          console.error(
                            "Embed SDK Failed to update agent's presence status:",
                            e
                          );
                        })
                    : console.warn(
                        "Embed SDK 'busyDND' presence option not found."
                      );
                })
                .catch((e) => {
                  console.error(
                    "Embed SDK Failed to retrieve presence options:",
                    e
                  );
                });
          },
          d = (e, o) => {
            e.conversation
              .getTranscript(o)
              .then((e) => {
                console.log("Embed SDK Transcript", e);
              })
              .catch((e) => {
                console.error("Embed SDK Failed to retrieve transcript:", e);
              });
          },
          l = (e) => {
            const o = {
              level: s.Information,
              message: "New conversation assigned to you!",
            };
            e.notification
              .addNewNotification(o)
              .then((e) => {
                console.log("Embed SDK Notification added with ID:", e);
              })
              .catch((e) => {
                console.error("Embed SDK Failed to add notification:", e);
              });
          },
          u = (e) => {
            e.conversation
              .getAssignedConversationsList(c.Active)
              .then((e) => {
                console.log(
                  "Embed SDK getAssignedConversationsList: Assigned Conversations:",
                  e
                );
              })
              .catch((e) => {
                console.error(
                  "Embed SDK getAssignedConversationsList: Failed to retrieve assigned conversations:",
                  e
                );
              });
          },
          v = (e) => {
            e.conversation
              .getFocusedConversationId()
              .then((e) => {
                console.log(
                  "Embed SDK getFocusedConversationId:  Focused Conversation ID:",
                  e
                );
              })
              .catch((e) => {
                console.error(
                  "Embed SDK getFocusedConversationId:  Failed to retrieve focused conversation ID:",
                  e
                );
              });
          },
          m = (e, o) => {
            e.conversation
              .getConversationData(o, [
                "msdyn_ocliveworkitemid",
                "msdyn_channel",
                "statuscode",
                "msdyn_createdon",
              ])
              .then((e) => {
                console.log("Embed SDK Conversation data:", e);
              })
              .catch((e) => {
                console.error(
                  "Embed SDK Failed to retrieve conversation data:",
                  e
                );
              });
          },
          f = (e, o) => {
            e.dataverse
              .retrieveRecord(
                "msdyn_ocliveworkitems",
                o,
                "?$select=msdyn_createdon"
              )
              .then((e) =>
                console.log("Embed SDK  Retrieve record Response:", e)
              )
              .catch((e) =>
                console.error("Embed SDK Failed to retrieve record:", e)
              );
          },
          h = (e, o) => {
            const n = `<fetch top="50"><entity name="msdyn_ocliveworkitem"><attribute name="msdyn_ocliveworkitemid"/><attribute name="msdyn_channel"/><attribute name="statuscode"/><attribute name="msdyn_createdon"/><filter><condition attribute="msdyn_ocliveworkitemid" operator="eq" value="${o}"/></filter></entity></fetch>`;
            e.dataverse
              .retrieveMultipleRecords(
                "msdyn_ocliveworkitems",
                `?fetchXml=${n}`
              )
              .then((e) =>
                console.log("Embed SDK  Retrieve multiple records Response:", e)
              )
              .catch((e) =>
                console.error(
                  "Embed SDK Failed to retrieve multiple records:",
                  e
                )
              );
          },
          C = (e) => {
            window.sforce.opencti.setSoftphonePanelWidth({ widthPX: e });
          },
          S = (e) => {
            window.sforce.opencti.setSoftphonePanelHeight({ heightPX: e });
          };
        o.setSoftPhonePanelVisibility = (e = !0) => {
          e !==
            window.sforce.opencti.isSoftphonePanelVisible({
              callback: (e) => {
                if (e.success) return e.returnValue.visible;
                throw new Error(e.errors);
              },
            }) &&
            window.sforce.opencti.setSoftphonePanelVisibility({ visible: e });
        };
      },
    },
    o = {};
  function n(t) {
    var i = o[t];
    if (void 0 !== i) return i.exports;
    var r = (o[t] = { exports: {} });
    return e[t].call(r.exports, r, r.exports, n), r.exports;
  }
  (() => {
    const e = n(200);
    class o {
      initialize() {
        if (void 0 === window.sforce || void 0 === window.sforce.opencti) {
          const e = "/support/api/54.0/lightning/opencti.js",
            n = `${new URL(document.referrer).origin}${e}`;
          return o.loadScript(n);
        }
        return Promise.resolve(!0);
      }
      bindEvents() {
        (0, e.embedSDKSampleUsage)();
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
      window.CCaaS.CTIDriver || (window.CCaaS.CTIDriver = o);
  })();
})();

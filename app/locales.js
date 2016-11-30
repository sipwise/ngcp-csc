Ext.define('Ngcp.csc.locales', {

    /*

    TODO: 1. Below is a list of duplicates, to be fixes, and list removed upon
    task completion.
    date: >> FOUND IN >> voicemails: column_headers, calls: columns
    duration: >> FOUND IN >> voicemails: column_headers, fax_spool: columns
    save_settings >> FOUND IN >> callbarring: (CAPS), voicemails: settings:
    password: >> FOUND IN >> login:, account: (CAPS, named subtitle:)
    reset_form >> FOUND IN >> fax_send:, account:
    caller: >> FOUND IN >> voicemails: column_headers:, fax_spool: columns:
    delete: >> FOUND IN >> callbarring: (CAPS), common: (CAP FL)
    save_settings >> FOUND IN >> callbarring: (CAPS), voicemails: settings: (called save:)
    company: >> FOUND IN >> addressbook: columns:, addressbook: field_labels:
    home: >> FOUND IN >> addressbook: field_labels (CAP FL), addressbook:
    office: >> FOUND IN >> addressbook: field_labels (CAP FL), addressbook:
    mobile: >> FOUND IN >> addressbook: field_labels (CAP FL), addressbook:
    fax: >> FOUND IN >> addressbook: field_labels (CAP FL), addressbook:
    e_mail: >> FOUND IN >> addressbook: field_labels (CAP FL), addressbook:
    homepage: >> FOUND IN >> addressbook: field_labels (CAP FL), addressbook:

    TODO: 2. After rebase, also check choose_file: and file:

    */

    statics: {
        login: {
            title: {
                en: 'Self Care Login',
                it: 'Connessione all\'Area di Amministrazione',
                de: 'Ihr persönliches Portal',
                fr: 'Connexion à l\'espace d\'administration',
                sp: 'Acceso al panel de administración'
            },
            password: {
                en: 'Password',
                it: 'Password',
                de: 'Passwort',
                fr: 'Mot de passe',
                sp: 'Contraseña'
            },
            choose_language: {
                en: 'Choose language',
                it: 'Choose language',
                de: 'Choose language',
                fr: 'Choose language',
                sp: 'Choose language'
            },
            button_text: {
                en: 'Login',
                it: 'Connetti',
                de: 'Einloggen',
                fr: 'Identifiant',
                sp: 'Iniciar sesión'
            },
            missing_username: {
                en: 'Please enter your username.',
                it: 'Prego immettere il proprio username.',
                de: 'Bitte geben Sie Ihren Usernamen ein.',
                fr: 'Entrer votre nom d’utilisateur.',
                sp: 'Por favor, introduzca su nombre de usuario.'
            },
            missing_password: {
                en: 'Please enter your password.',
                it: 'Prego immettere la propria password.',
                de: 'Bitte geben Sie Ihr Passwort ein.',
                fr: 'Entrer votre mot de passe.',
                sp: 'Por favor, introduzca su contraseña.'
            },
            invalid_credentials: {
                en: 'Login failed, please verify username and password.',
                it: 'Login fallito, prego verificare le credenziali.',
                de: 'Login fehlgeschlagen, bitte überprüfen Sie Ihren Usernamen und Ihr Passwort.',
                fr: 'L\'établissement de la connexion a échoué, vérifiez le nom d’utilisateur et le mot de passe.',
                sp: 'Acceso denegado. Por favor, compruebe el nombre de usuario y la contraseña.'
            },
            remember_me: {
                en: 'Remember me',
                it: 'Remember me',
                de: 'Remember me',
                fr: 'Remember me',
                sp: 'Remember me'
            },
            forgot_password: {
                en: 'Forgot Password ?',
                it: 'Forgot Password ?',
                de: 'Forgot Password ?',
                fr: 'Forgot Password ?',
                sp: 'Forgot Password ?'
            }
        },
        main: {
            tooltips: {
                see_profile: {
                    en: 'See your profile',
                    it: 'See your profile',
                    de: 'See your profile',
                    fr: 'See your profile',
                    sp: 'See your profile'
                }
            },
            logged_in_as: {
                en: 'Logged in as ',
                it: 'Logged in as ',
                de: 'Logged in as ',
                fr: 'Logged in as ',
                sp: 'Logged in as '
            }
        },
        summary: {
            title: {
                en: 'Welcome to your personal desktop.',
                it: 'Welcome to your personal desktop.',
                de: 'Welcome to your personal desktop.',
                fr: 'Welcome to your personal desktop.',
                sp: 'Welcome to your personal desktop.'
            },
            account_balance: {
                en: 'ACCOUNT BALANCE',
                it: 'ACCOUNT BALANCE',
                de: 'ACCOUNT BALANCE',
                fr: 'ACCOUNT BALANCE',
                sp: 'ACCOUNT BALANCE'
            },
            clients: {
                en: 'CLIENTS',
                it: 'CLIENTS',
                de: 'CLIENTS',
                fr: 'CLIENTS',
                sp: 'CLIENTS'
            },
            clients_label: {
                en: 'client devices registered',
                it: 'client devices registered',
                de: 'client devices registered',
                fr: 'client devices registered',
                sp: 'client devices registered'
            },
            new_voicemails: {
                en: 'NEW VOICEMAILS',
                it: 'NEW VOICEMAILS',
                de: 'NEW VOICEMAILS',
                fr: 'NEW VOICEMAILS',
                sp: 'NEW VOICEMAILS'
            },
            call_forwards: {
                en: 'CALL FORWARDS',
                it: 'CALL FORWARDS',
                de: 'CALL FORWARDS',
                fr: 'CALL FORWARDS',
                sp: 'CALL FORWARDS'
            },
            all_voicemails: {
                en: 'all voicemails',
                it: 'all voicemails',
                de: 'all voicemails',
                fr: 'all voicemails',
                sp: 'all voicemails'
            },
            reminder: {
                en: 'view settings',
                it: 'view settings',
                de: 'view settings',
                fr: 'view settings',
                sp: 'view settings'
            }
        },
        calls: {
            section_title: {
                en: 'Incoming and outgoing calls.',
                it: 'Incoming and outgoing calls.',
                de: 'Incoming and outgoing calls.',
                fr: 'Incoming and outgoing calls.',
                sp: 'Incoming and outgoing calls.'
            },
            recent_calls: {
                en: 'RECENT CALLS',
                it: 'RECENT CALLS',
                de: 'RECENT CALLS',
                fr: 'RECENT CALLS',
                sp: 'RECENT CALLS'
            },
            columns: {
                duration: {
                    en: 'duration',
                    it: 'duration',
                    de: 'duration',
                    fr: 'duration',
                    sp: 'duration'
                },
                charges: {
                    en: 'charges',
                    it: 'charges',
                    de: 'charges',
                    fr: 'charges',
                    sp: 'charges'
                }
            },
            call_type: {
                incoming: {
                    en: 'incoming',
                    it: 'incoming',
                    de: 'incoming',
                    fr: 'incoming',
                    sp: 'incoming'
                },
                outgoing: {
                    en: 'outgoing',
                    it: 'outgoing',
                    de: 'outgoing',
                    fr: 'outgoing',
                    sp: 'outgoing'
                },
                forwarded: {
                    en: 'forwarded',
                    it: 'forwarded',
                    de: 'forwarded',
                    fr: 'forwarded',
                    sp: 'forwarded'
                }
            },
            all_calls: {
                en: 'all calls',
                it: 'all calls',
                de: 'all calls',
                fr: 'all calls',
                sp: 'all calls'
            }
        },
        callbarring: {
            title: {
                en: 'Call barring for incoming and outgoing calls.',
                it: 'Call barring for incoming and outgoing calls.',
                de: 'Call barring for incoming and outgoing calls.',
                fr: 'Call barring for incoming and outgoing calls.',
                sp: 'Call barring for incoming and outgoing calls.'
            },
            subtitle: {
                en: 'CALL BARRING',
                it: 'CALL BARRING',
                de: 'CALL BARRING',
                fr: 'CALL BARRING',
                sp: 'CALL BARRING'
            },
            user_label: {
                en: 'Settings for ',
                it: 'Settings for ',
                de: 'Settings for ',
                fr: 'Settings for ',
                sp: 'Settings for '
            },
            incoming_calls: {
                en: 'INCOMING CALLS',
                it: 'INCOMING CALLS',
                de: 'INCOMING CALLS',
                fr: 'INCOMING CALLS',
                sp: 'INCOMING CALLS'
            },
            outgoing_calls: {
                en: 'OUTGOING CALLS',
                it: 'OUTGOING CALLS',
                de: 'OUTGOING CALLS',
                fr: 'OUTGOING CALLS',
                sp: 'OUTGOING CALLS'
            },
            save_settings: {
                en: 'SAVE SETTINGS',
                it: 'SAVE SETTINGS',
                de: 'SAVE SETTINGS',
                fr: 'SAVE SETTINGS',
                sp: 'SAVE SETTINGS'
            },
            add_number: {
                en: 'ADD NUMBER',
                it: 'ADD NUMBER',
                de: 'ADD NUMBER',
                fr: 'ADD NUMBER',
                sp: 'ADD NUMBER'
            },
            delete: {
                en: 'DELETE',
                it: 'DELETE',
                de: 'DELETE',
                fr: 'DELETE',
                sp: 'DELETE'
            },
            disable: {
                en: 'DISABLE',
                it: 'DISABLE',
                de: 'DISABLE',
                fr: 'DISABLE',
                sp: 'DISABLE'
            },
            enable: {
                en: 'ENABLE',
                it: 'ENABLE',
                de: 'ENABLE',
                fr: 'ENABLE',
                sp: 'ENABLE'
            },
            block_everything: {
                en: 'Block everything except ...',
                it: 'Block everything except ...',
                de: 'Block everything except ...',
                fr: 'Block everything except ...',
                sp: 'Block everything except ...'
            },
            allow_everything: {
                en: 'Allow everything except ...',
                it: 'Allow everything except ...',
                de: 'Allow everything except ...',
                fr: 'Allow everything except ...',
                sp: 'Allow everything except ...'
            },
            hide_own: {
                en: 'HIDE OWN NUMBER ON OUTGOING CALLS',
                it: 'HIDE OWN NUMBER ON OUTGOING CALLS',
                de: 'HIDE OWN NUMBER ON OUTGOING CALLS',
                fr: 'HIDE OWN NUMBER ON OUTGOING CALLS',
                sp: 'HIDE OWN NUMBER ON OUTGOING CALLS'
            },
            enabled_success: {
                en: 'Enable/disable successfully toggled.',
                it: 'Enable/disable successfully toggled.',
                de: 'Enable/disable successfully toggled.',
                fr: 'Enable/disable successfully toggled.',
                sp: 'Enable/disable successfully toggled.'
            },
            new_entry: {
                en: 'NEW ENTRY',
                it: 'NEW ENTRY',
                de: 'NEW ENTRY',
                fr: 'NEW ENTRY',
                sp: 'NEW ENTRY'
            },
            new_entry_instructions: {
                en: 'Please use digits only and include the area code of the number. You may use the wildcard characters "?" for one and "*" for an indefinite number of arbitrary digits.',
                it: 'Please use digits only and include the area code of the number. You may use the wildcard characters "?" for one and "*" for an indefinite number of arbitrary digits.',
                de: 'Please use digits only and include the area code of the number. You may use the wildcard characters "?" for one and "*" for an indefinite number of arbitrary digits.',
                fr: 'Please use digits only and include the area code of the number. You may use the wildcard characters "?" for one and "*" for an indefinite number of arbitrary digits.',
                sp: 'Please use digits only and include the area code of the number. You may use the wildcard characters "?" for one and "*" for an indefinite number of arbitrary digits.'
            },
            new_entry_anonymous: {
                en: 'To block anonymous calls you may just submit the empty string.',
                it: 'To block anonymous calls you may just submit the empty string.',
                de: 'To block anonymous calls you may just submit the empty string.',
                fr: 'To block anonymous calls you may just submit the empty string.',
                sp: 'To block anonymous calls you may just submit the empty string.'
            }
        },
        account: {
            title: {
                en: 'Your personal settings.',
                it: 'Your personal settings.',
                de: 'Your personal settings.',
                fr: 'Your personal settings.',
                sp: 'Your personal settings.'
            },
            subtitle: {
                en: 'PASSWORD',
                it: 'PASSWORD',
                de: 'PASSWORD',
                fr: 'PASSWORD',
                sp: 'PASSWORD'
            },
            password_instructions: {
                en: 'You may change the password for your self-administration login here.',
                it: 'You may change the password for your self-administration login here.',
                de: 'You may change the password for your self-administration login here.',
                fr: 'You may change the password for your self-administration login here.',
                sp: 'You may change the password for your self-administration login here.'
            },
            change_password: {
                en: 'change password',
                it: 'change password',
                de: 'change password',
                fr: 'change password',
                sp: 'change password'
            },
            reset_form: {
                en: 'reset form',
                it: 'reset form',
                de: 'reset form',
                fr: 'reset form',
                sp: 'reset form'
            },
            password_short: {
                en: 'The password is too short, please use 6 characters at least.',
                it: 'The password is too short, please use 6 characters at least.',
                de: 'The password is too short, please use 6 characters at least.',
                fr: 'The password is too short, please use 6 characters at least.',
                sp: 'The password is too short, please use 6 characters at least.'
            },
            wrong_password: {
                en: 'Wrong password, please verify your input.',
                it: 'Wrong password, please verify your input.',
                de: 'Wrong password, please verify your input.',
                fr: 'Wrong password, please verify your input.',
                sp: 'Wrong password, please verify your input.'
            },
            password_match: {
                en: 'Passwords do not match, please try again.',
                it: 'Passwords do not match, please try again.',
                de: 'Passwords do not match, please try again.',
                fr: 'Passwords do not match, please try again.',
                sp: 'Passwords do not match, please try again.'
            },
            change_success: {
                en: 'The password has been changed successfully.',
                it: 'The password has been changed successfully.',
                de: 'The password has been changed successfully.',
                fr: 'The password has been changed successfully.',
                sp: 'The password has been changed successfully.'
            },
            enter_current: {
                en: 'Please enter your current password.',
                it: 'Please enter your current password.',
                de: 'Please enter your current password.',
                fr: 'Please enter your current password.',
                sp: 'Please enter your current password.'
            },
            field_labels: {
                old_password: {
                    en: 'old password',
                    it: 'old password',
                    de: 'old password',
                    fr: 'old password',
                    sp: 'old password'
                },
                new_password: {
                    en: 'new password',
                    it: 'new password',
                    de: 'new password',
                    fr: 'new password',
                    sp: 'new password'
                },
                repeat_password: {
                    en: 'repeat',
                    it: 'repeat',
                    de: 'repeat',
                    fr: 'repeat',
                    sp: 'repeat'
                }
            }
        },
        filters: {
            search: {
                en: 'SEARCH',
                it: 'SEARCH',
                de: 'SEARCH',
                fr: 'SEARCH',
                sp: 'SEARCH'
            },
            from: {
                en: 'time range (DD.MM.YYYY)',
                it: 'time range (DD.MM.YYYY)',
                de: 'time range (DD.MM.YYYY)',
                fr: 'time range (DD.MM.YYYY)',
                sp: 'time range (DD.MM.YYYY)'
            },
            to: {
                en: 'to',
                it: 'to',
                de: 'to',
                fr: 'to',
                sp: 'to'
            },
            search_term: {
                en: 'search term',
                it: 'search term',
                de: 'search term',
                fr: 'search term',
                sp: 'search term'
            },
            apply: {
                en: 'apply filter',
                it: 'apply filter',
                de: 'apply filter',
                fr: 'apply filter',
                sp: 'apply filter'
            },
            reset: {
                en: 'reset filter',
                it: 'reset filter',
                de: 'reset filter',
                fr: 'reset filter',
                sp: 'reset filter'
            }
        },
        voicemails: {
            title: {
                en: 'Your voicemail recordings.',
                it: 'Your voicemail recordings.',
                de: 'Your voicemail recordings.',
                fr: 'Your voicemail recordings.',
                sp: 'Your voicemail recordings.'
            },
            subtitle: {
                en: 'RECEIVED VOICEMAILS',
                it: 'RECEIVED VOICEMAILS',
                de: 'RECEIVED VOICEMAILS',
                fr: 'RECEIVED VOICEMAILS',
                sp: 'RECEIVED VOICEMAILS'
            },
            user_label: {
                en: 'Voicemails for ',
                it: 'Voicemails for ',
                de: 'Voicemails for ',
                fr: 'Voicemails for ',
                sp: 'Voicemails for'
            },
            column_headers: {
                caller: {
                    en: 'caller',
                    it: 'caller',
                    de: 'caller',
                    fr: 'caller',
                    sp: 'caller'
                },
                duration: {
                    en: 'duration',
                    it: 'duration',
                    de: 'duration',
                    fr: 'duration',
                    sp: 'duration'
                }
            },
            by_months: {
                en: 'VOICEMAILS BY MONTH',
                it: 'VOICEMAILS BY MONTH',
                de: 'VOICEMAILS BY MONTH',
                fr: 'VOICEMAILS BY MONTH',
                sp: 'VOICEMAILS BY MONTH'
            },
            settings: {
                title: {
                    en: 'SETTINGS',
                    it: 'SETTINGS',
                    de: 'SETTINGS',
                    fr: 'SETTINGS',
                    sp: 'SETTINGS'
                },
                description: {
                    en: 'Send notification of new messages to the following e-mail adddress',
                    it: 'Send notification of new messages to the following e-mail adddress',
                    de: 'Send notification of new messages to the following e-mail adddress',
                    fr: 'Send notification of new messages to the following e-mail adddress',
                    sp: 'Send notification of new messages to the following e-mail adddress'
                },
                attach_recording: {
                    en: 'attach recording',
                    it: 'attach recording',
                    de: 'attach recording',
                    fr: 'attach recording',
                    sp: 'attach recording'
                },
                pin: {
                    en: 'PIN code',
                    it: 'PIN code',
                    de: 'PIN code',
                    fr: 'PIN code',
                    sp: 'PIN code'
                },
                pin_instructions: {
                    en: 'With your 4-digit PIN you may query your voicebox from any telephone.',
                    it: 'With your 4-digit PIN you may query your voicebox from any telephone.',
                    de: 'With your 4-digit PIN you may query your voicebox from any telephone.',
                    fr: 'With your 4-digit PIN you may query your voicebox from any telephone.',
                    sp: 'With your 4-digit PIN you may query your voicebox from any telephone.'
                },
                save: {
                    en: 'save settings',
                    it: 'save settings',
                    de: 'save settings',
                    fr: 'save settings',
                    sp: 'save settings'
                }
            }
        },
        chat: {
            title: {
                en: 'Buddy List',
                it: 'Buddy List',
                de: 'Buddy List',
                fr: 'Buddy List',
                sp: 'Buddy List'
            },
            new_group: {
                en: 'Create new team',
                it: 'Create new team',
                de: 'Create new team',
                fr: 'Create new team',
                sp: 'Create new team'
            },
            provide_name: {
                en: 'Chat group name',
                it: 'Chat group name',
                de: 'Chat group name',
                fr: 'Chat group name',
                sp: 'Chat group name'
            },
            msg_box: {
                empty_text: {
                    en: 'Type a message',
                    it: 'Type a message',
                    de: 'Type a message',
                    fr: 'Type a message',
                    sp: 'Type a message'
                }
            },
            start_conversation: {
                en: 'You can start a private conversation with {0} here.',
                it: 'You can start a private conversation with {0} here.',
                de: 'You can start a private conversation with {0} here.',
                fr: 'You can start a private conversation with {0} here.',
                sp: 'You can start a private conversation with {0} here.'
            },
            alerts: {
                user_ddrop: {
                    en: 'Only users can be dropped',
                    it: 'Only users can be dropped',
                    de: 'Only users can be dropped',
                    fr: 'Only users can be dropped',
                    sp: 'Only users can be dropped'
                },
                user_in_group: {
                    en: 'User already in group.',
                    it: 'User already in group.',
                    de: 'User already in group.',
                    fr: 'User already in group.',
                    sp: 'User already in group.'
                },
                user_added: {
                    en: '{0} added to {1}  channel.',
                    it: '{0} added to {1}  channel.',
                    de: '{0} added to {1}  channel.',
                    fr: '{0} added to {1}  channel.',
                    sp: '{0} added to {1}  channel.'
                },

                choose_valid_name: {
                    en: 'Please choose a valid name.',
                    it: 'Please choose a valid name.',
                    de: 'Please choose a valid name.',
                    fr: 'Please choose a valid name.',
                    sp: 'Please choose a valid name.'
                },
                channel_created: {
                    en: 'Channel created',
                    it: 'Channel created',
                    de: 'Channel created',
                    fr: 'Channel created',
                    sp: 'Channel created'
                },

                channel_delete: {
                    en: 'Do you really want to delete {0} channel?',
                    it: 'Do you really want to delete {0} channel?',
                    de: 'Do you really want to delete {0} channel?',
                    fr: 'Do you really want to delete {0} channel?',
                    sp: 'Do you really want to delete {0} channel?'
                }
            }
        },
        addressbook: {
            title: {
                en: 'Your personal addressbook.',
                it: 'Your personal addressbook.',
                de: 'Your personal addressbook.',
                fr: 'Your personal addressbook.',
                sp: 'Your personal addressbook.'
            },
            subtitle: {
                en: 'CONTACTS',
                it: 'CONTACTS',
                de: 'CONTACTS',
                fr: 'CONTACTS',
                sp: 'CONTACTS'
            },
            user_label: {
                en: 'Contacts for ',
                it: 'Contacts for ',
                de: 'Contacts for ',
                fr: 'Contacts for ',
                sp: 'Contacts for '
            },
            columns: {
                name: {
                    en: 'name',
                    it: 'name',
                    de: 'name',
                    fr: 'name',
                    sp: 'name'
                },
                firstname: {
                    en: 'firstname',
                    it: 'firstname',
                    de: 'firstname',
                    fr: 'firstname',
                    sp: 'firstname'
                },
                lastname: {
                    en: 'lastname',
                    it: 'lastname',
                    de: 'lastname',
                    fr: 'lastname',
                    sp: 'lastname'
                },
                company: {
                    en: 'company',
                    it: 'company',
                    de: 'company',
                    fr: 'company',
                    sp: 'company'
                }
            },
            phone_numbers: {
                en: 'phone numbers',
                it: 'phone numbers',
                de: 'phone numbers',
                fr: 'phone numbers',
                sp: 'phone numbers'
            },
            web: {
                en: 'web',
                it: 'web',
                de: 'web',
                fr: 'web',
                sp: 'web'
            },
            home: {
                en: 'home',
                it: 'home',
                de: 'home',
                fr: 'home',
                sp: 'home'
            },
            office: {
                en: 'office',
                it: 'office',
                de: 'office',
                fr: 'office',
                sp: 'office'
            },
            mobile: {
                en: 'mobile',
                it: 'mobile',
                de: 'mobile',
                fr: 'mobile',
                sp: 'mobile'
            },
            fax: {
                en: 'fax',
                it: 'fax',
                de: 'fax',
                fr: 'fax',
                sp: 'fax'
            },
            e_mail: {
                en: 'e-mail',
                it: 'e-mail',
                de: 'e-mail',
                fr: 'e-mail',
                sp: 'e-mail'
            },
            homepage: {
                en: 'homepage',
                it: 'homepage',
                de: 'homepage',
                fr: 'homepage',
                sp: 'homepage'
            },
            new_contact: {
                en: 'Create new contact',
                it: 'Create new contact',
                de: 'Create new contact',
                fr: 'Create new contact',
                sp: 'Create new contact'
            },
            field_labels: {
                first_name: {
                    en: 'First name',
                    it: 'First name',
                    de: 'First name',
                    fr: 'First name',
                    sp: 'First name'
                },
                last_name: {
                    en: 'Last name',
                    it: 'Last name',
                    de: 'Last name',
                    fr: 'Last name',
                    sp: 'Last name'
                },
                company: {
                    en: 'Company',
                    it: 'Company',
                    de: 'Company',
                    fr: 'Company',
                    sp: 'Company'
                },
                home: {
                    en: 'Home',
                    it: 'Home',
                    de: 'Home',
                    fr: 'Home',
                    sp: 'Home'
                },
                office: {
                    en: 'Office',
                    it: 'Office',
                    de: 'Office',
                    fr: 'Office',
                    sp: 'Office'
                },
                mobile: {
                    en: 'Mobile',
                    it: 'Mobile',
                    de: 'Mobile',
                    fr: 'Mobile',
                    sp: 'Mobile'
                },
                fax: {
                    en: 'Fax',
                    it: 'Fax',
                    de: 'Fax',
                    fr: 'Fax',
                    sp: 'Fax'
                },
                e_mail: {
                    en: 'E-mail',
                    it: 'E-mail',
                    de: 'E-mail',
                    fr: 'E-mail',
                    sp: 'E-mail'
                },
                homepage: {
                    en: 'Homepage',
                    it: 'Homepage',
                    de: 'Homepage',
                    fr: 'Homepage',
                    sp: 'Homepage'
                }
            }
        },
        reminder:{
            title:{
                en: 'Set your personal alarm.',
                it: 'Set your personal alarm.',
                de: 'Set your personal alarm.',
                fr: 'Set your personal alarm.',
                sp: 'Set your personal alarm.'
            },
            subtitle:{
                en: 'Reminder',
                it: 'Reminder',
                de: 'Reminder',
                fr: 'Reminder',
                sp: 'Reminder'
            },
            settings:{
                en: 'Settings for',
                it: 'Settings for',
                de: 'Settings for',
                fr: 'Settings for',
                sp: 'Settings for'
            },
            is:{
                en: 'Reminder is',
                it: 'Reminder is',
                de: 'Reminder is',
                fr: 'Reminder is',
                sp: 'Reminder is'
            },
            time:{
                en: 'Time of the day',
                it: 'Time of the day',
                de: 'Time of the day',
                fr: 'Time of the day',
                sp: 'Time of the day'
            },
            recurrence:{
                en: 'Recurrence',
                it: 'Recurrence',
                de: 'Recurrence',
                fr: 'Recurrence',
                sp: 'Recurrence'
            },

            never:{
                en: 'never',
                it: 'never',
                de: 'never',
                fr: 'never',
                sp: 'never'
            },

            weekdays:{
                en: 'on weekedays',
                it: 'on weekedays',
                de: 'on weekedays',
                fr: 'on weekedays',
                sp: 'on weekedays'
            },

            always:{
                en: 'every day',
                it: 'every day',
                de: 'every day',
                fr: 'every day',
                sp: 'every day'
            }
        },
        webrtc:{
            title:{
                en: 'Webrtc',
                it: 'Webrtc',
                de: 'Webrtc',
                fr: 'Webrtc',
                sp: 'Webrtc'
            }
        },
        fax_spool: {
            title: {
                en: 'Your faxes.',
                it: 'Your faxes.',
                de: 'Your faxes.',
                fr: 'Your faxes.',
                sp: 'Your faxes.'
            },
            subtitle: {
                en: 'FAX SPOOL',
                it: 'FAX SPOOL',
                de: 'FAX SPOOL',
                fr: 'FAX SPOOL',
                sp: 'FAX SPOOL'
            },
            user_label: {
                en: 'Faxes for ',
                it: 'Faxes for ',
                de: 'Faxes for ',
                fr: 'Faxes for ',
                sp: 'Faxes for '
            },
            columns: {
                number: {
                    en: '#',
                    it: '#',
                    de: '#',
                    fr: '#',
                    sp: '#'
                },
                timestamp: {
                    en: 'timestamp',
                    it: 'timestamp',
                    de: 'timestamp',
                    fr: 'timestamp',
                    sp: 'timestamp'
                },
                status: {
                    en: 'status',
                    it: 'status',
                    de: 'status',
                    fr: 'status',
                    sp: 'status'
                },
                duration: {
                    en: 'duration',
                    it: 'duration',
                    de: 'duration',
                    fr: 'duration',
                    sp: 'duration'
                },
                direction: {
                    en: 'direction',
                    it: 'direction',
                    de: 'direction',
                    fr: 'direction',
                    sp: 'direction'
                },
                caller: {
                    en: 'caller',
                    it: 'caller',
                    de: 'caller',
                    fr: 'caller',
                    sp: 'caller'
                },
                callee: {
                    en: 'callee',
                    it: 'callee',
                    de: 'callee',
                    fr: 'callee',
                    sp: 'callee'
                },
                pages: {
                    en: 'pages',
                    it: 'pages',
                    de: 'pages',
                    fr: 'pages',
                    sp: 'pages'
                }
            }
        },
        fax_send: {
            title: {
                en: 'Send a fax.',
                it: 'Send a fax.',
                de: 'Send a fax.',
                fr: 'Send a fax.',
                sp: 'Send a fax.'
            },
            subtitle: {
                en: 'CREATE FAX',
                it: 'CREATE FAX',
                de: 'CREATE FAX',
                fr: 'CREATE FAX',
                sp: 'CREATE FAX'
            },
            send_fax: {
                en: 'send fax',
                it: 'send fax',
                de: 'send fax',
                fr: 'send fax',
                sp: 'send fax'
            },
            reset_form: {
                en: 'reset form',
                it: 'reset form',
                de: 'reset form',
                fr: 'reset form',
                sp: 'reset form'
            },
            field_labels: {
                destination_number: {
                    en: 'Destination number',
                    it: 'Destination number',
                    de: 'Destination number',
                    fr: 'Destination number',
                    sp: 'Destination number'
                },
                quality: {
                    en: 'Quality',
                    it: 'Quality',
                    de: 'Quality',
                    fr: 'Quality',
                    sp: 'Quality'
                },
                page_header: {
                    en: 'Page header',
                    it: 'Page header',
                    de: 'Page header',
                    fr: 'Page header',
                    sp: 'Page header'
                },
                content: {
                    en: 'Content',
                    it: 'Content',
                    de: 'Content',
                    fr: 'Content',
                    sp: 'Content'
                },
                file: {
                    en: 'File',
                    it: 'File',
                    de: 'File',
                    fr: 'File',
                    sp: 'File'
                }
            },
            tooltips: {
                number_fax: {
                    en: 'The number to send the fax to',
                    it: 'The number to send the fax to',
                    de: 'The number to send the fax to',
                    fr: 'The number to send the fax to',
                    sp: 'The number to send the fax to'
                },
                fax_quality: {
                    en: 'Fax quality',
                    it: 'Fax quality',
                    de: 'Fax quality',
                    fr: 'Fax quality',
                    sp: 'Fax quality'
                },
                header_text: {
                    en: 'Header text to add on every page',
                    it: 'Header text to add on every page',
                    de: 'Header text to add on every page',
                    fr: 'Header text to add on every page',
                    sp: 'Header text to add on every page'
                },
                content_text: {
                    en: 'Content text',
                    it: 'Content text',
                    de: 'Content text',
                    fr: 'Content text',
                    sp: 'Content text'
                },
                file_to_send: {
                    en: 'File to send. Will be sent if no text content specified. Supported File Types are TXT, PDF, PS, TIFF',
                    it: 'File to send. Will be sent if no text content specified. Supported File Types are TXT, PDF, PS, TIFF',
                    de: 'File to send. Will be sent if no text content specified. Supported File Types are TXT, PDF, PS, TIFF',
                    fr: 'File to send. Will be sent if no text content specified. Supported File Types are TXT, PDF, PS, TIFF',
                    sp: 'File to send. Will be sent if no text content specified. Supported File Types are TXT, PDF, PS, TIFF'
                }
            },
            choose_file: {
                en: 'Choose file',
                it: 'Choose file',
                de: 'Choose file',
                fr: 'Choose file',
                sp: 'Choose file'
            }
        },
        common: {
            today: {
                en: 'Today',
                it: 'Today',
                de: 'Today',
                fr: 'Today',
                sp: 'Today'
            },
            last_week: {
                en: 'Last week',
                it: 'Last week',
                de: 'Last week',
                fr: 'Last week',
                sp: 'Last week'
            },
            logout: {
                en: 'Logout',
                it: 'Logout',
                de: 'Logout',
                fr: 'Logout',
                sp: 'Logout'
            },
            past: {
                en: 'Past',
                it: 'Past',
                de: 'Past',
                fr: 'Past',
                sp: 'Past'
            },
            no: {
                en: 'no',
                it: 'no',
                de: 'no',
                fr: 'no',
                sp: 'no'
            },
            delete: {
                en: 'Delete',
                it: 'Delete',
                de: 'Delete',
                fr: 'Delete',
                sp: 'Delete'
            },
            listen: {
                en: 'Listen',
                it: 'Listen',
                de: 'Listen',
                fr: 'Listen',
                sp: 'Listen'
            },
            view: {
                en: 'View',
                it: 'View',
                de: 'View',
                fr: 'View',
                sp: 'View'
            },
            save_success: {
                en: 'Successfully saved.',
                it: 'Successfully saved.',
                de: 'Successfully saved.',
                fr: 'Successfully saved.',
                sp: 'Successfully saved.'
            },
            save_unsuccess: {
                en: 'Something went wrong. Please retry later',
                it: 'Something went wrong. Please retry later',
                de: 'Something went wrong. Please retry later',
                fr: 'Something went wrong. Please retry later',
                sp: 'Something went wrong. Please retry later'
            },
            add_success: {
                en: 'Successfully added.',
                it: 'Successfully added.',
                de: 'Successfully added.',
                fr: 'Successfully added.',
                sp: 'Successfully added.'
            },
            remove_success: {
                en: 'Successfully removed.',
                it: 'Successfully removed.',
                de: 'Successfully removed.',
                fr: 'Successfully removed.',
                sp: 'Successfully removed.'
            },
            submit: {
                en: 'submit',
                it: 'submit',
                de: 'submit',
                fr: 'submit',
                sp: 'submit'
            },
            add: {
                en: 'add',
                it: 'add',
                de: 'add',
                fr: 'add',
                sp: 'add'
            },
            call: {
                en: 'Call',
                it: 'Call',
                de: 'Call',
                fr: 'Call',
                sp: 'Call'
            },
            videocall: {
                en: 'Videocall',
                it: 'Videocall',
                de: 'Videocall',
                fr: 'Videocall',
                sp: 'Videocall'
            },
            save: {
                en: 'Save',
                it: 'Save',
                de: 'Save',
                fr: 'Save',
                sp: 'Save'
            },
            reset: {
                en: 'Reset',
                it: 'Reset',
                de: 'Reset',
                fr: 'Reset',
                sp: 'Reset'
            },
            order_by: {
                en: 'Order by:',
                it: 'Order by:',
                de: 'Order by:',
                fr: 'Order by:',
                sp: 'Order by:'
            },
            no_empty_value: {
                en: 'Missing or invalid input found',
                it: 'Missing or invalid input found',
                de: 'Missing or invalid input found',
                fr: 'Missing or invalid input found',
                sp: 'Missing or invalid input found'
            },
            when: {
                en: 'When',
                it: 'When',
                de: 'When',
                fr: 'When',
                sp: 'When'
            },
            active: {
                en: 'Active',
                it: 'Active',
                de: 'Active',
                fr: 'Active',
                sp: 'Active'
            },
            inactive: {
                en: 'Inactive',
                it: 'Inactive',
                de: 'Inactive',
                fr: 'Inactive',
                sp: 'Inactive'
            },
            username: {
                en: 'Username',
                it: 'Username',
                de: 'Benutzername',
                fr: 'Identifiant',
                sp: 'Nombre de usuario'
            },
            number: {
                en: 'number',
                it: 'number',
                de: 'number',
                fr: 'number',
                sp: 'number'
            },
            date: {
                en: 'date',
                it: 'date',
                de: 'date',
                fr: 'date',
                sp: 'date'
            }
        }
    }
})

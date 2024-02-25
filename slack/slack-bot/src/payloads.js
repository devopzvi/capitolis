module.exports = {
    confirmation: context => {
        return {
            channel: context.channel_id,
            text: `*Ticket created by <@${context.user}>*`,
            blocks: JSON.stringify([
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Ticket created by <@${context.user}>*`
                    }
                },
                {
                    type: 'divider'
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Title*\n${context.title}\n\n*Description*\n${context.description}\n\n*Link*\n${context.link}`
                    }
                },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `*Domain*: ${context.domain}\n\n*Env*: ${context.env}`
                        }
                    ]
                }
            ])
        }
    },
    modal: context => {
        return {
            trigger_id: context.trigger_id,
            view: JSON.stringify({
                type: 'modal',
                title: {
                    type: 'plain_text',
                    text: 'Submit a DevOps ticket'
                },
                callback_id: 'submit-ticket',
                submit: {
                    type: 'plain_text',
                    text: 'Submit'
                },
                blocks: [
                    {
                        block_id: 'title_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Title'
                        },
                        element: {
                            action_id: 'title',
                            type: 'plain_text_input',
                            max_length: 30
                        },
                        hint: {
                            type: 'plain_text',
                            text: 'Short summary of the issue'
                        }
                    },
                    {
                        block_id: 'description_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Description'
                        },
                        element: {
                            action_id: 'description',
                            type: 'plain_text_input',
                            multiline: true,
                            max_length: 250
                        }
                    },
                    {
                        block_id: 'link_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Link'
                        },
                        element: {
                            action_id: 'link',
                            type: 'url_text_input'
                        }
                    },                    
                    {
                        block_id: 'domain_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Domain'
                        },
                        element: {
                            action_id: 'domain',
                            type: 'static_select',
                            options: [
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Platform"
                                    },
                                    value: "platform"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Infra"
                                    },
                                    value: "infra"
                                }
                            ]
                        }
                    },                    
                    {
                        block_id: 'env_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Environment'
                        },
                        element: {
                            action_id: 'env',
                            type: 'static_select',
                            options: [
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Integration"
                                    },
                                    value: "integration"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Staging"
                                    },
                                    value: "staging"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Production"
                                    },
                                    value: "production"
                                }
                            ]
                        }
                    }
                ]
            })
        }
    }
}
/*
	MIT License

	Copyright (c) 2023 Edgar Alexis Lima <contact@robotoskunk.com>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/


export interface IEmail
{
	id: string;
	hash: string;
	email: string;
	userId: string;
	type: Email.Type;
	verified: boolean;
	createdAt: Date;
	isFake: boolean;
}

/**
 * Represents an email address.
 */
export class Email implements IEmail
{
	public id: string;
	public hash: string;
	public email: string;
	public userId: string;
	public type: Email.Type;
	public verified: boolean;
	public createdAt: Date;
	public isFake: boolean;

	constructor(email: IEmail)
	{
		this.id = email.id;
		this.hash = email.hash;
		this.email = email.email;
		this.userId = email.userId;
		this.type = email.type;
		this.verified = email.verified;
		this.createdAt = email.createdAt;
		this.isFake = email.isFake;
	}
}


export namespace Email
{
	/**
	 * List of email address types.
	 */
	export enum Type {
		PRIMARY = 0,
		CONTACT = 1,
		SECONDARY = 2
	}

	/**
	 * List of email types that can be sent.
	 */
	export enum MailType {
		NEW_USER,
		VERIFY,
		PASSWORD_RESET_REQUEST,
		PASSWORD_RESET,
		ACCOUNT_DELETION
	}

	/**
	 * List of pre-valid domains for email addresses.
	 */
	export const validDomains = [
		'live.com.mx',
		'gmail.com',
		'yahoo.com',
		'hotmail.com',
		'aol.com',
		'hotmail.co.uk',
		'hotmail.fr',
		'msn.com',
		'yahoo.fr',
		'wanadoo.fr',
		'orange.fr',
		'comcast.net',
		'yahoo.co.uk',
		'yahoo.com.br',
		'yahoo.co.in',
		'live.com',
		'rediffmail.com',
		'free.fr',
		'gmx.de',
		'web.de',
		'yandex.ru',
		'ymail.com',
		'libero.it',
		'outlook.com',
		'uol.com.br',
		'bol.com.br',
		'mail.ru',
		'cox.net',
		'hotmail.it',
		'sbcglobal.net',
		'sfr.fr',
		'live.fr',
		'verizon.net',
		'live.co.uk',
		'googlemail.com',
		'yahoo.es',
		'ig.com.br',
		'live.nl',
		'bigpond.com',
		'terra.com.br',
		'yahoo.it',
		'neuf.fr',
		'yahoo.de',
		'alice.it',
		'rocketmail.com',
		'att.net',
		'laposte.net',
		'facebook.com',
		'bellsouth.net',
		'yahoo.in',
		'hotmail.es',
		'charter.net',
		'yahoo.ca',
		'yahoo.com.au',
		'rambler.ru',
		'hotmail.de',
		'tiscali.i',
		'shaw.c',
		'yahoo.co.j',
		'sky.co',
		'earthlink.net',
		'optonline.net',
		'freenet.de',
		't-online.de',
		'aliceadsl.fr',
		'virgilio.it',
		'home.nl',
		'qq.com',
		'telenet.be',
		'me.com',
		'yahoo.com.ar',
		'tiscali.co.uk',
		'yahoo.com.mx',
		'voila.fr',
		'gmx.net',
		'mail.com',
		'planet.nl',
		'tin.it',
		'live.it',
		'ntlworld.com',
		'arcor.de',
		'yahoo.co.id',
		'frontiernet.net',
		'hetnet.nl',
		'live.com.au',
		'yahoo.com.sg',
		'zonnet.nl',
		'club-internet.fr',
		'juno.com',
		'optusnet.com.au',
		'blueyonder.co.uk',
		'bluewin.ch',
		'skynet.be',
		'sympatico.ca',
		'windstream.net',
		'mac.com',
		'centurytel.net',
		'chello.nl',
		'live.ca',
		'aim.com',
		'bigpond.net.au',
		'robotoskunk.com',
		'microsoft.com',
		'google.com',
		'goddady.com'
	];

	/**
	 * List of common bot names that are not allowed to register.
	 */
	export const invalidNames = [
		'noreply',
		'no-reply',
		'support',
		'example',
		'info',
		'user',
		'mail',
		'test',
		'noreply-dominos',
		'microsoftstore',
		'news',
		'email',
		'notification',
		'purchases',
		'purchase',
		'notifications',
		'noreply-purchases',
		'message',
		'messages',
		'no-responder',
		'dominospizzamx',
		'friendupdates',
		'mailer',
		'reply'
	];
}

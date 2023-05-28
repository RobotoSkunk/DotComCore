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


import { RSRandom } from './RSRandom';
import { LangCode } from '../language/defaults';

export class RSTime {
	private static readonly s = 1000;
	private static readonly m = this.s * 60;
	private static readonly h = this.m * 60;
	private static readonly d = this.h * 24;
	private static readonly w = this.d * 7;
	private static readonly M = this.d * 30;
	private static readonly y = this.d * 365;

	public static get _SECOND_(): number { return this.s; }
	public static get _MINUTE_(): number { return this.m; }
	public static get _HOUR_(): number { return this.h; }
	public static get _DAY_(): number { return this.d; }
	public static get _WEEK_(): number { return this.w; }
	public static get _MONTH_(): number { return this.M; }
	public static get _YEAR_(): number { return this.y; }


	public static readonly langs = {
		en: {
			n: 'now',
			s: ['second', 'seconds'],
			m: ['minute', 'minutes'],
			h: ['hour', 'hours'],
			d: ['day', 'days'],
			w: ['week', 'weeks'],
			M: ['month', 'months'],
			y: ['year', 'years'],
			ago: '$ ago'
		},
		es: {
			n: 'ahora',
			s: ['segundo', 'segundos'],
			m: ['minuto', 'minutos'],
			h: ['hora', 'horas'],
			d: ['día', 'días'],
			w: ['semana', 'semanas'],
			M: ['mes', 'meses'],
			y: ['año', 'años'],
			ago: 'hace $'
		},
		fr: {
			n: 'maintenant',
			s: ['seconde', 'secondes'],
			m: ['minute', 'minutes'],
			h: ['heure', 'heures'],
			d: ['jour', 'jours'],
			w: ['semaine', 'semaines'],
			M: ['mois', 'mois'],
			y: ['an', 'ans'],
			ago: 'il y a $'
		},
		pt: {
			n: 'agora',
			s: ['segundo', 'segundos'],
			m: ['minuto', 'minutos'],
			h: ['hora', 'horas'],
			d: ['dia', 'dias'],
			w: ['semana', 'semanas'],
			M: ['mês', 'meses'],
			y: ['ano', 'anos'],
			ago: 'há $'
		}
	}

	/**
	 * Translates a time in milliseconds to a human readable string.
	 * @param ms The time in milliseconds.
	 * @param lang The language to use.
	 * @returns A human readable string.
	 */
	public static ToString(ms: number, lang: LangCode = 'en'): string
	{
		var langData = this.langs[lang];
		if (!langData) {
			langData = this.langs.en;
		}

		const t = Math.abs(ms);

		if (t >= this.y) return `${Math.round(t / this.y)} ${langData.y[+(t >= this.y * 2)]}`;
		if (t >= this.M) return `${Math.round(t / this.M)} ${langData.M[+(t >= this.M * 2)]}`;
		if (t >= this.w) return `${Math.round(t / this.w)} ${langData.w[+(t >= this.w * 2)]}`;
		if (t >= this.d) return `${Math.round(t / this.d)} ${langData.d[+(t >= this.d * 2)]}`;
		if (t >= this.h) return `${Math.round(t / this.h)} ${langData.h[+(t >= this.h * 2)]}`;
		if (t >= this.m) return `${Math.round(t / this.m)} ${langData.m[+(t >= this.m * 2)]}`;
		if (t >= this.s) return `${Math.round(t / this.s)} ${langData.s[+(t >= this.s * 2)]}`;

		return langData.n;
	}

	/**
	 * Translates a date to a human readable string relative to the current time.
	 * @param date The date to compare.
	 * @param lang The language to use.
	 * @returns A human readable string.
	 */
	public static Relative(date: Date, lang: LangCode = 'en'): string
	{
		return RSTime.ToString(Date.now() - date.getTime(), lang);
	}

	/**
	 * Translates a date to a human readable string relative to the current time, but with the word "ago" appended.
	 * @param date The date to compare.
	 * @param lang The language to use.
	 * @returns A human readable string.
	 */
	public static RelativeAgo(date: Date, lang: LangCode = 'en'): string
	{
		const __tmp = RSTime.Relative(date, lang);

		if (__tmp === this.langs[lang].n) {
			return __tmp;
		}

		return this.langs[lang].ago.replace('$', __tmp);
	}

	/**
	 * Sets the timezone of a date.
	 * @param date The date to modify.
	 * @param GTM The timezone to set in GTM.
	 * @returns The modified date.
	 */
	public static SetTimezone(date: Date, GTM: number): Date
	{
		return new Date(date.getTime() + GTM * 60 * 60 * 1000);
	}

	/**
	 * Checks if the birthdate of a user is at least 13 years old.
	 * @param birthdate The birthdate of the user.
	 * @returns True if the user is at least 13 years old.
	 */
	public static MinimumAge(birthdate: Date): boolean
	{
		return Date.now() - birthdate.getTime() >= this.y * 13;
	}

	/**
	 * Returns the age of the user in years, but anonymously.
	 * @param birthdate The birthdate of the user.
	 */
	public static KAnonAge(birthdate: Date): number
	{
		const age = ~~((Date.now() - birthdate.getTime()) / this.y);

		if (age < 16) return RSRandom.IntRange(8, 15);
		if (age < 18) return RSRandom.Choose([16, 17]);
		if (age < 30) return RSRandom.IntRange(18, 29);

		return RSRandom.IntRange(30, 50);
	}
}

export namespace RSTime
{
	export enum MONTH_INDEX {
		JANUARY,
		FEBRUARY,
		MARCH,
		APRIL,
		MAY,
		JUNE,
		JULY,
		AUGUST,
		SEPTEMBER,
		OCTOBER,
		NOVEMBER,
		DECEMBER,
	}
}

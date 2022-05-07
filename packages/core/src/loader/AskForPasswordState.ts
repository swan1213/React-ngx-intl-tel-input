/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2022 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import type { VerifyPassword } from '../types/DocumentAskPasswordEvent';
import { LoadingStatus } from './LoadingStatus';

export enum SubmitPassword {
    REQUIRE_PASSWORD,
    WRONG_PASSWORD,
}

export class AskForPasswordState extends LoadingStatus {
    public verifyPassword: VerifyPassword;
    public submitPassword: SubmitPassword;

    constructor(verifyPassword: VerifyPassword, submitPassword: SubmitPassword) {
        super();
        this.verifyPassword = verifyPassword;
        this.submitPassword = submitPassword;
    }
}

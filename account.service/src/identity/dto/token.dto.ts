export class TokenDto {
    readonly token: string;
    readonly expiresIn: string;
    readonly refreshTokenExpiresIn: string;
    readonly expired: Boolean;
}
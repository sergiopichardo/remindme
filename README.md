# RemindMe - Tutorial 

## Research 
- `<Suspense />` react component


## Steps
- Create `.env` file 
- Create Clerk application 
    - Select default providers 
        - email and gmail sign in 
- Copy and paste API Keys to `.env` file
- Wrap your app in `<ClerkProvider />`
- Add `middleware.ts` file 
- create `./app/(auth)` directory 
- create `./app/(auth)/sign-up` directory

- Install @clerk/nextjs
    - `npm install @clerk/nextjs`
- Install shadcn 
    - `npx shadcn-ui@latest init`
- Install Next Themes 
    - `npm i next-themes`
- Install Prisma 
    - `npm i @prisma/client`
    - `npx prisma init --datasource-provider sqlite`
    - `npx prisma db pull`
    - `npx prisma generate`
    - `npx prisma migrate dev`
    - `npx prisma studio`
    - [Best practice to create prisma client](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)
- Import Hero Icons 
    - https://heroicons.com/
- Install Zod 
    - `npm install zod`


### Docs
- https://clerk.com/docs/components/overview
- https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#update-your-environment-variables

### Shadcn
- `npx shadcn-ui@latest add`
    - Select A to select them all, then press enter
- `npx prisma studio`

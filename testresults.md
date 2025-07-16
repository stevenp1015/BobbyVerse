
Success. You can now start the database server using:

    pg_ctl -D /Users/ttig/projects/BobbyVerse/.db_data -l logfile start

ttig@WIIP-Mac05 BobbyVerse % pg_ctl -D $PGDATA -l logfile start

waiting for server to start.... done
server started
ttig@WIIP-Mac05 BobbyVerse % createuser --pwprompt bobby_vision_user

Enter password for new role: 
Enter it again: 
ttig@WIIP-Mac05 BobbyVerse % createdb --owner=bobby_vision_user bobby_vision_test

ttig@WIIP-Mac05 BobbyVerse % export DB_USER=bobby_vision_user
export DB_PASSWORD=bobbys_password
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=bobby_vision_test
ttig@WIIP-Mac05 BobbyVerse % env
USER=ttig
MallocNanoZone=0
__CFBundleIdentifier=com.exafunction.windsurf
COMMAND_MODE=unix2003
LOGNAME=ttig
PATH=/Users/ttig/.rbenv/shims:/Users/ttig/.rbenv/shims:/Users/ttig/.codeium/windsurf/bin:/opt/homebrew/opt/curl/bin:/usr/local/opt/sqlite/bin:/Users/ttig/google-cloud-sdk/bin:/usr/local/opt/coreutils/libexec/gnubin:/opt/homebrew/opt/curl/bin:/usr/local/bin:/usr/local/opt/sqlite/bin:/opt/local/bin:/opt/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/MacGPG2/bin:/Library/Apple/usr/bin:/Applications/Wireshark.app/Contents/MacOS:/Applications/Postgres.app/Contents/Versions/latest/bin:/Users/ttig/development/flutter/bin:/Users/ttig/.rbenv/shims:/Users/ttig/.rbenv/bin:/Users/ttig/.codeium/windsurf/bin:/Users/ttig/Library/pnpm:/opt/homebrew/opt/curl/bin:/usr/local/opt/sqlite/bin:/Users/ttig/.local/bin:/Users/ttig/google-cloud-sdk/bin:/usr/local/opt/coreutils/libexec/gnubin:/opt/local/bin:/opt/local/sbin:/Users/ttig/.cargo/bin:/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages:/Users/ttig/Library/Python/3.12/bin:/Users/ttig/.fzf/bin:/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages:/Users/ttig/Library/Python/3.12/bin
SSH_AUTH_SOCK=/private/tmp/com.apple.launchd.NowqqzmJ1b/Listeners
SHELL=/bin/zsh
HOME=/Users/ttig
__CF_USER_TEXT_ENCODING=0x1F5:0x0:0x0
TMPDIR=/var/folders/m3/v_1vdl990jx3slqnkr7085_m0000gn/T/
XPC_SERVICE_NAME=0
XPC_FLAGS=0x0
ORIGINAL_XDG_CURRENT_DESKTOP=undefined
SHLVL=1
PWD=/Users/ttig/projects/BobbyVerse
OLDPWD=/Users/ttig/projects/BobbyVerse
NVM_DIR=/Users/ttig/.nvm
NVM_CD_FLAGS=-q
NVM_RC_VERSION=
GOOGLE_APPLICATION_CREDENTIALS=/Users/ttig/gen-lang-client-0378374275-0bbc33ba3efb.json
PNPM_HOME=/Users/ttig/Library/pnpm
RBENV_SHELL=--no-names
TERM_PROGRAM=vscode
TERM_PROGRAM_VERSION=1.99.3
LANG=en_US.UTF-8
COLORTERM=truecolor
GIT_ASKPASS=/Applications/Windsurf.app/Contents/Resources/app/extensions/git/dist/askpass.sh
VSCODE_GIT_ASKPASS_NODE=/Applications/Windsurf.app/Contents/Frameworks/Windsurf Helper (Plugin).app/Contents/MacOS/Windsurf Helper (Plugin)
VSCODE_GIT_ASKPASS_EXTRA_ARGS=
VSCODE_GIT_ASKPASS_MAIN=/Applications/Windsurf.app/Contents/Resources/app/extensions/git/dist/askpass-main.js
VSCODE_GIT_IPC_HANDLE=/var/folders/m3/v_1vdl990jx3slqnkr7085_m0000gn/T/vscode-git-86005c5b22.sock
VSCODE_INJECTION=1
ZDOTDIR=/Users/ttig
USER_ZDOTDIR=/Users/ttig
TERM=xterm-256color
VSCODE_PROFILE_INITIALIZED=1
PGDATA=/Users/ttig/projects/BobbyVerse/.db_data
DB_USER=bobby_vision_user
DB_PASSWORD=bobbys_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bobby_vision_test
_=/usr/local/opt/coreutils/libexec/gnubin/env
ttig@WIIP-Mac05 BobbyVerse % cd bobby-vision/backend

ttig@WIIP-Mac05 backend % npm test

> backend@1.0.0 test
> jest

[napi-postinstall@0.3.0] Trying to install package "@unrs/resolver-binding-darwin-x64" using npm
[napi-postinstall@0.3.0] Failed to install package "@unrs/resolver-binding-darwin-x64" using npm Command failed: npm install --loglevel=error --prefer-offline --no-audit --progress=false @unrs/resolver-binding-darwin-x64@1.11.1
npm error code ETARGET
npm error notarget No matching version found for @unrs/resolver-binding-darwin-x64@1.11.1.
npm error notarget In most cases you or one of your dependencies are requesting
npm error notarget a package version that doesn't exist.
npm error A complete log of this run can be found in: /Users/ttig/.npm/_logs/2025-07-16T02_29_44_516Z-debug-0.log

[napi-postinstall@0.3.0] Trying to download "https://registry.npmjs.org/@unrs/resolver-binding-darwin-x64/-/resolver-binding-darwin-x64-1.11.1.tgz"
 FAIL  __tests__/services/pricingService.test.js
  ● Test suite failed to run

    Cannot find module '@google/genai' from '__tests__/services/pricingService.test.js'

      16 | // Mock the document generation service
      17 | // Mock the genai library directly if needed for more granular mocking within pricingService
    > 18 | jest.mock('@google/genai');
         |      ^
      19 |
      20 |
      21 | describe('Pricing Service Unit Tests', () => {

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.mock (__tests__/services/pricingService.test.js:18:6)

 FAIL  __tests__/integration/intelligence.test.js
  ● Test suite failed to run

    Cannot find module '@google/generative-ai' from 'services/nlpService.js'

      3 | const fs = require('fs').promises;
      4 | const path = require('path');// Update the import statement for the new library
    > 5 | const { GoogleGenerativeAI } = require('@google/generative-ai');
        |                                ^
      6 | const { ApiError, ValidationError } = require('../utils/errors'); // Import custom error classes
      7 |
      8 | /**

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (services/nlpService.js:5:32)
      at Object.require (__tests__/integration/intelligence.test.js:9:20)

 FAIL  __tests__/integration/clients.test.js
  ● Console

    console.log
      Connecting to test database...

      at log (__tests__/utils/testDatabase.js:9:11)

    console.log
      Running migrations...

      at log (__tests__/utils/testDatabase.js:15:11)

    console.error
      Error running migrations: error: relation "jobs" does not exist
          at /Users/ttig/projects/BobbyVerse/bobby-vision/backend/node_modules/pg-pool/index.js:45:11
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at runMigrations (/Users/ttig/projects/BobbyVerse/bobby-vision/backend/__tests__/utils/testDatabase.js:23:7)
          at Object.<anonymous> (/Users/ttig/projects/BobbyVerse/bobby-vision/backend/__tests__/integration/clients.test.js:9:5) {
        length: 102,
        severity: 'ERROR',
        code: '42P01',
        detail: undefined,
        hint: undefined,
        position: undefined,
        internalPosition: undefined,
        internalQuery: undefined,
        where: undefined,
        schema: undefined,
        table: undefined,
        column: undefined,
        dataType: undefined,
        constraint: undefined,
        file: 'namespace.c',
        line: '639',
        routine: 'RangeVarGetRelidExtended'
      }

      25 |     }
      26 |   } catch (error) {
    > 27 |     console.error('Error running migrations:', error);
         |             ^
      28 |     throw error;
      29 |   }
      30 | };

      at error (__tests__/utils/testDatabase.js:27:13)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

    console.log
      Disconnecting from test database...

      at log (__tests__/utils/testDatabase.js:50:11)

    console.log
      Test database connection ended.

      at log (__tests__/utils/testDatabase.js:52:11)

  ● Client Integration Tests › POST /api/clients should create a new client

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

  ● Client Integration Tests › should create a client and then create a job linked to that client

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

  ● Client Integration Tests › GET /api/clients should retrieve all clients

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

  ● Client Integration Tests › GET /api/clients/:id should retrieve a specific client

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

  ● Client Integration Tests › GET /api/clients/:id should return 404 for non-existent client

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

  ● Client Integration Tests › PUT /api/clients/:id should update a client

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

  ● Client Integration Tests › DELETE /api/clients/:id should delete a client

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

  ● Client Integration Tests › POST /api/clients should return 400 if required fields are missing

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

  ● Client Integration Tests › PUT /api/clients/:id should return 404 for non-existent client

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

  ● Client Integration Tests › POST /api/clients should return 500 on database error

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/clients.test.js:9:5)

 FAIL  __tests__/integration/documents.test.js
  ● Test suite failed to run

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/documents.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/documents.test.js:7:7)

 FAIL  __tests__/integration/jobs.test.js
  ● Test suite failed to run

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/jobs.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/jobs.test.js:5:13)

 FAIL  __tests__/services/nlpService.test.js
  ● Test suite failed to run

    Cannot find module '@google/genai' from '__tests__/services/nlpService.test.js'

      2 |
      3 | // Mock the @google/genai library or the relevant parts
    > 4 | jest.mock('@google/genai');
        |      ^
      5 | // You might need to mock the specific model method used, e.g., model.generateContent
      6 |
      7 | // TODO: Mock the model object and its methods that nlpService uses

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.mock (__tests__/services/nlpService.test.js:4:6)

 FAIL  __tests__/integration/materials.test.js
  ● Console

    console.log
      Connecting to test database...

      at log (__tests__/utils/testDatabase.js:9:11)

    console.log
      Running migrations...

      at log (__tests__/utils/testDatabase.js:15:11)

    console.error
      Error running migrations: error: relation "jobs" does not exist
          at /Users/ttig/projects/BobbyVerse/bobby-vision/backend/node_modules/pg-pool/index.js:45:11
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at runMigrations (/Users/ttig/projects/BobbyVerse/bobby-vision/backend/__tests__/utils/testDatabase.js:23:7)
          at Object.<anonymous> (/Users/ttig/projects/BobbyVerse/bobby-vision/backend/__tests__/integration/materials.test.js:15:2) {
        length: 102,
        severity: 'ERROR',
        code: '42P01',
        detail: undefined,
        hint: undefined,
        position: undefined,
        internalPosition: undefined,
        internalQuery: undefined,
        where: undefined,
        schema: undefined,
        table: undefined,
        column: undefined,
        dataType: undefined,
        constraint: undefined,
        file: 'namespace.c',
        line: '639',
        routine: 'RangeVarGetRelidExtended'
      }

      25 |     }
      26 |   } catch (error) {
    > 27 |     console.error('Error running migrations:', error);
         |             ^
      28 |     throw error;
      29 |   }
      30 | };

      at error (__tests__/utils/testDatabase.js:27:13)
      at Object.<anonymous> (__tests__/integration/materials.test.js:15:2)

    console.log
      Disconnecting from test database...

      at log (__tests__/utils/testDatabase.js:50:11)

    console.log
      Test database connection ended.

      at log (__tests__/utils/testDatabase.js:52:11)

  ● Materials Integration Tests › POST /api/materials should create a new material

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/materials.test.js:15:2)

  ● Materials Integration Tests › GET /api/materials should retrieve all materials

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/materials.test.js:15:2)

  ● Materials Integration Tests › GET /api/materials/:id should retrieve a specific material

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/materials.test.js:15:2)

  ● Materials Integration Tests › PUT /api/materials/:id should update a material

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/materials.test.js:15:2)

  ● Materials Integration Tests › DELETE /api/materials/:id should delete a material

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/materials.test.js:15:2)

  ● Materials Integration Tests › POST /api/materials should return 400 for missing required fields

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/materials.test.js:15:2)

  ● Materials Integration Tests › GET /api/materials/:id should return 404 and error for non-existent material

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/materials.test.js:15:2)

  ● Materials Integration Tests › PUT /api/materials/:id should return 404 and error for non-existent material

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/materials.test.js:15:2)

  ● Materials Integration Tests › DELETE /api/materials/:id should return 404 and error for non-existent material

    error: relation "jobs" does not exist

      21 |       const filePath = path.join(migrationsDir, file);
      22 |       const sql = await fs.readFile(filePath, 'utf-8');
    > 23 |       await pool.query(sql);
         |       ^
      24 |       console.log(`Applied migration: ${file}`);
      25 |     }
      26 |   } catch (error) {

      at node_modules/pg-pool/index.js:45:11
      at runMigrations (__tests__/utils/testDatabase.js:23:7)
      at Object.<anonymous> (__tests__/integration/materials.test.js:15:2)

 FAIL  __tests__/integration/serviceLibrary.test.js
  ● Console

    console.log
      Disconnecting from test database...

      at log (__tests__/utils/testDatabase.js:50:11)

    console.log
      Test database connection ended.

      at log (__tests__/utils/testDatabase.js:52:11)

  ● Service Library Integration Tests › POST /api/services should create a new service

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/serviceLibrary.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/serviceLibrary.test.js:10:11)

  ● Service Library Integration Tests › GET /api/services should retrieve all services

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/serviceLibrary.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/serviceLibrary.test.js:10:11)

  ● Service Library Integration Tests › GET /api/services/:id should retrieve a specific service

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/serviceLibrary.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/serviceLibrary.test.js:10:11)

  ● Service Library Integration Tests › GET /api/services/:id should return 404 if service not found

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/serviceLibrary.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/serviceLibrary.test.js:10:11)

  ● Service Library Integration Tests › PUT /api/services/:id should update a service

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/serviceLibrary.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/serviceLibrary.test.js:10:11)

  ● Service Library Integration Tests › DELETE /api/services/:id should delete a service

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/serviceLibrary.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/serviceLibrary.test.js:10:11)

  ● Service Library Integration Tests › POST /api/services should return 400 for missing required fields

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/serviceLibrary.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/serviceLibrary.test.js:10:11)

  ● Service Library Integration Tests › PUT /api/services/:id should return 404 and error for non-existent service

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/serviceLibrary.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/serviceLibrary.test.js:10:11)

  ● Service Library Integration Tests › DELETE /api/services/:id should return 404 and error for non-existent service

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/serviceLibrary.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/serviceLibrary.test.js:10:11)

 FAIL  __tests__/services/itemizationService.test.js
  ● Test suite failed to run

    Cannot find module '@google/genai' from '__tests__/services/itemizationService.test.js'

       6 |
       7 | // Mock the @google/genai library or the relevant parts
    >  8 | jest.mock('@google/genai');
         |      ^
       9 | const { GoogleGenerativeAI } = require('@google/genai');
      10 |
      11 | // TODO: Mock the model object and its methods that itemizationService uses

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.mock (__tests__/services/itemizationService.test.js:8:6)

 FAIL  __tests__/services/emailService.test.js
  ● Console

    console.warn
      Email sending is not configured. Please set EMAIL_SERVICE environment variables.

      16 |     });
      17 | } else {
    > 18 |     console.warn("Email sending is not configured. Please set EMAIL_SERVICE environment variables.");
         |             ^
      19 | }
      20 |
      21 |

      at Object.warn (services/emailService.js:18:13)
      at Object.require (__tests__/services/emailService.test.js:1:24)

  ● Email Service Unit Tests › draftEmail should generate email with full job, client, and proposal details

    expect(received).toBe(expected) // Object.is equality

    Expected: "456 Oak Ave"
    Received: "Jane Smith's Job Document"

      23 |
      24 |     expect(emailDetails.to).toBe('jane.smith@example.com');
    > 25 |     expect(emailDetails.subject).toBe('456 Oak Ave');
         |                                  ^
      26 |     expect(emailDetails.text).toContain('Hi Jane Smith,');
      27 |     expect(emailDetails.text).toContain('See attached proposal for your review.');
      28 |     expect(emailDetails.attachments).toEqual([

      at Object.toBe (__tests__/services/emailService.test.js:25:34)

  ● Email Service Unit Tests › draftEmail should generate email with full job, client, and invoice details

    expect(received).toBe(expected) // Object.is equality

    Expected: "789 Pine Ln"
    Received: "Bob Johnson's Job Document"

      43 |
      44 |     expect(emailDetails.to).toBe('bob.johnson@example.com');
    > 45 |     expect(emailDetails.subject).toBe('789 Pine Ln');
         |                                  ^
      46 |     expect(emailDetails.text).toContain('Hi Bob Johnson,');
      47 |     expect(emailDetails.text).toContain('See attached invoice for your review.');
      48 |     expect(emailDetails.attachments).toEqual([

      at Object.toBe (__tests__/services/emailService.test.js:45:34)

  ● Email Service Unit Tests › draftEmail should generate email with full job, client, and report details

    expect(received).toBe(expected) // Object.is equality

    Expected: "101 Maple Rd"
    Received: "Alice Williams's Job Document"

      63 |
      64 |     expect(emailDetails.to).toBe('alice.williams@example.com');
    > 65 |     expect(emailDetails.subject).toBe('101 Maple Rd');
         |                                  ^
      66 |     expect(emailDetails.text).toContain('Hi Alice Williams,');
      67 |     expect(emailDetails.text).toContain('See attached report for your review.');
      68 |     expect(emailDetails.attachments).toEqual([

      at Object.toBe (__tests__/services/emailService.test.js:65:34)

  ● Email Service Unit Tests › draftEmail should handle missing client name

    expect(received).toBe(expected) // Object.is equality

    Expected: "222 Birch St"
    Received: "Job Document"

      83 |
      84 |     expect(emailDetails.to).toBe('no.name@example.com');
    > 85 |     expect(emailDetails.subject).toBe('222 Birch St');
         |                                  ^
      86 |     expect(emailDetails.text).toContain('Hi ,'); // Expecting "Hi ," when name is missing
      87 |     expect(emailDetails.attachments[0].filename).toBe('222 Birch St_Proposal.pdf');
      88 |   });

      at Object.toBe (__tests__/services/emailService.test.js:85:34)

  ● Email Service Unit Tests › draftEmail should handle missing job address (subject uses address)

    expect(received).toBe(expected) // Object.is equality

    Expected: ""
    Received: "Charlie Brown's Job Document"

       96 |
       97 |     expect(emailDetails.to).toBe('charlie.b@example.com');
    >  98 |     expect(emailDetails.subject).toBe(''); // Expecting empty subject if address is missing
          |                                  ^
       99 |     expect(emailDetails.text).toContain('Hi Charlie Brown,');
      100 |     // Attachment filename might be impacted if address is missing - adjust filename generation logic if needed
      101 |     expect(emailDetails.attachments[0].filename).toBe('null_Invoice.pdf'); // Or handle this case in draftEmail

      at Object.toBe (__tests__/services/emailService.test.js:98:34)

 PASS  __tests__/utils/errors.test.js
 FAIL  __tests__/integration/externalApi.test.js
  ● Test suite failed to run

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/externalApi.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/externalApi.test.js:12:13)

 FAIL  __tests__/integration/auth.test.js
  ● Test suite failed to run

    Cannot find module '/home/user/studio/bobby-vision/backend/routes/jobs' from 'server.js'

    Require stack:
      server.js
      __tests__/integration/auth.test.js

      2 | const app = express();
      3 | const port = 3001;
    > 4 | const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
        |                    ^
      5 | const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
      6 | const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
      7 | const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/index.js:863:11)
      at Object.require (server.js:4:20)
      at Object.require (__tests__/integration/auth.test.js:10:13)

Test Suites: 12 failed, 1 passed, 13 total
Tests:       33 failed, 3 passed, 36 total
Snapshots:   0 total
Time:        4.213 s
Ran all test suites.
### **Architectural Blueprint: The "Bobby-Vision" Intelligent Business Management System**

This document outlines the foundational architecture for a groundbreaking digital system designed to entirely transform Bobby's business operations, focusing on simplicity for the end-user (Bobby himself) while housing advanced AI capabilities under the hood. The system is built to adapt to Bobby's unique workflow, streamline his current archaic processes, and provide unprecedented insights and automation, all without overwhelming his delightful, technologically challenged sensibilities.

**I. Core Design Philosophy & User Experience (The "Cool & Simple" Bobby Approach)**

The system's interface will be a masterclass in elegant simplicity, blending cutting-edge design with an intuitive user experience tailored specifically for Bobby. It will *not* resemble a clunky, high-contrast, "elderly" interface. Instead, it will feature:

*   **Clean, Modern Aesthetics:** A visually appealing, minimalist design with clear typography, smart use of whitespace, and a harmonious color palette that is modern and "cool," not sterile or condescending.
*   **Intuitive Interaction:** Large, easily tappable buttons and clear navigation paths. The emphasis will be on direct interaction, minimizing nested menus or complex configuration steps.
*   **Contextual Information Display:** Only relevant information will be presented at any given time, reducing visual clutter and cognitive overload.
*   **Adaptive Complexity Toggle:** This is a crucial innovation. The system will feature a prominent, easily accessible toggle (e.g., "Simple View" / "Advanced Options" or "Quick Quote" / "Detailed Estimate").
    *   **"Simple View" (Default for Bobby):** This mode will hide all advanced features, presenting only the bare essentials required for quick, common tasks (e.g., initiating a proposal via natural language, seeing a predicted price, and sending the email). This is for Bobby's everyday, in-the-truck use.
    *   **"Advanced Options" (For Deeper Dive/Your Mom):** Toggling this will reveal additional functionality such as the profitability slider, detailed material costing breakdown, historical performance tracking, specific service attributes, and configuration options. This allows Bobby to access deeper insights when he chooses, or for your mom to manage backend settings when she's assisting. This toggle ensures he's never overwhelmed, but the power is always there.
*   **Mobile-Optimized Experience:** The entire interface will be meticulously designed to be highly responsive and fully functional on mobile devices, ensuring a seamless experience whether Bobby is using a tablet in his truck or a desktop in the office. This is not a "desktop app crammed onto a phone," but a truly native-feeling mobile tool.

**II. System Modules & Functional Architecture**

The "Bobby-Vision" system will be comprised of several distinct, yet tightly integrated, modules. These modules encapsulate the specific features outlined in your list, ensuring a robust and extensible architecture.

1.  **Document Creation & Management Module:**
    *   **Multi-Type Document Generation:** This core capability allows the system to produce:
        *   **Proposals / Estimates:** The primary pre-sales document, detailing scope and predicted cost.
        *   **Optional Post-Completion Invoices:** Documents generated for billing purposes, often after a job has been completed and approved.
        *   **Descriptive Report Generation:** The ability to create professional, non-financial reports (like the "Roof Inspection" documents), allowing Bobby to provide detailed assessments without an attached monetary value.
    *   **Modular Project Structure:**
        *   **Sub-Job Segmentation:** The system will intelligently segment a single, larger project into multiple, distinct "sub-jobs" (e.g., "Kitchen Renovation," "Basement Remodel," "Bathroom Repair"). Each sub-job will have its own specific line items and an automatically calculated sub-total, providing clear compartmentalization within a comprehensive proposal.
        *   **Client-Centric Job Nesting:** For property management clients (like "The Meadows"), the system will support nesting individual jobs under a master client entity (e.g., "The Meadows" as the main client, with distinct proposals/invoices for "Unit 3712" and "Unit 2309" linked underneath). This provides a holistic view of client relationships and all associated properties/units.
    *   **One-Click Invoice Conversion:** A prominent, intuitive control will allow for instantaneous conversion of an approved proposal into a formal invoice document. This streamlined process minimizes manual effort and ensures accuracy, with the capability to send the invoice immediately after job completion is confirmed.
    *   **Automated PDF Conversion:** All generated documents (proposals, invoices, reports) will be automatically rendered into clean, universally viewable PDF files, ready for digital distribution.

2.  **Service & Pricing Engine Module:**
    *   **Master Service Library:**
        *   **Pre-Populated SKU List:** A comprehensive, categorized library of all services (SKUs) derived and intelligently extracted from Bobby's existing historical invoices and proposals. This forms the backbone of standardized service offerings.
        *   **On-the-Fly Custom Item Addition:** Provides the flexibility for Bobby to add new, unique, or custom line items to any proposal or invoice instantly, ensuring the system never limits his ability to quote unique work.
    *   **Configurable Service Attributes:** Allows for detailed specification of service options within a line item (e.g., selecting a "Gutter Size" of `5"` or `6"`, or a "Material" type like `Aluminum` or `Copper`). These attributes will be presented as simple, clear choices.
    *   **Toggles for Common Variables:** Simple, binary toggles (e.g., a checkbox for "Customer-Supplied Material" or "Complex Installation") can be applied to specific line items. These toggles will dynamically impact the backend cost calculations and, subsequently, the profitability metrics.
    *   **Real-Time Profitability Calculator:** A robust backend system will maintain records of estimated material and labor costs associated with each service item.
        *   **Live Calculation:** As line items are added to a proposal, the system will provide a real-time, dynamic calculation of the total estimated cost, gross profit, and profit margin for the entire quote.
        *   **Profitability Slider (Advanced Option):** When the "Advanced Options" toggle is engaged, a visual slider will allow Bobby to subtly adjust the pricing between optimizing for competitiveness (lower margin) and maximizing profit (higher margin), giving him granular control without needing complex calculations.
    *   **Live Material Costing & Sourcing (The "Smart Procurement" Sub-Module):** This is a distinct but integrated workflow, accessible when needed, not during initial proposal creation.
        *   **API Hooks to Major Local Suppliers:** Direct, programmatic connections will be established with major local suppliers in the Bellmore, New York, 11710 area (e.g., Home Depot, ABC Supply, Lowe's, and others with available APIs).
        *   **AI-Driven Material Quantity Estimation:** Leveraging the AI, based on the selected services and project scope, the system will intelligently estimate the required quantities of materials.
        *   **Selective Material Purchase:** Bobby will be presented with the AI-suggested material list and quantities. He can easily check off items he *doesn't* need to buy (e.g., if he has stock on hand), ensuring only necessary items are processed.
        *   **Optimized Sourcing:** For the materials Bobby needs, the system will query the supplier APIs to:
            *   **Check Local Availability/Stock:** Confirming if the materials are currently in stock.
            *   **Compare Prices:** Presenting the best available price across the connected suppliers.
            *   **Calculate Distance:** Showing the distance from Bobby's *current location* (via GPS) or the *job site location* (user selectable) to each supplier store.
        *   **Direct Order Placement (Optional):** When Bobby has identified the best option, the system will offer the ability to place an order for **pickup** directly through the supplier's API right then and there. This eliminates phone calls, manual order entry, and ensures efficient material acquisition. This process will be isolated into a dedicated, intuitive sub-module so as not to interrupt the primary estimate workflow.

3.  **Client & Business Management (CRM) Module:**
    *   **Centralized Customer Database:** The system will automatically build and dynamically maintain a comprehensive client database.
        *   **Auto-Creation from Proposals:** Every time a new proposal or invoice is generated for a client, a client profile is either created or updated, capturing contact information, addresses, and relevant notes.
        *   **Full Job History:** Each client profile will house a complete, chronological history of all associated proposals, invoices, and reports, providing an immediate, searchable overview of all past work.
    *   **Historical Performance Tracking (Advanced Option):** When the "Advanced Options" toggle is engaged, this feature will analyze past jobs to advise on pricing strategy, identifying trends in profitability, common services, and successful past quotes, thereby giving Bobby data-driven insights into his own business performance.

4.  **Intelligence & Automation Module:**
    *   **Natural Language & Voice Input:** The primary interface for creating estimates. Bobby can simply speak or type a request (e.g., "Start a proposal for a new roof for James at 110 Rockaway Street with 30-year shingles and new attic fan"), and the system will intelligently parse it.
    *   **Intelligent Detail Parsing:** Advanced NLP algorithms will automatically extract all critical job specifics (client name, address, services requested, materials, dimensions, etc.) from the unstructured voice/text input.
    *   **AI-Driven Service Itemization:** The system converts the parsed details into a structured, bulleted list of services, drawing from the Master Service Library to ensure consistency.
    *   **Contextual/Dynamic Service Descriptions (Optional):** Bobby can choose to have the AI generate concise, single-sentence descriptions for each service item, adapting phrasing based on the specific job context, adding a professional polish to the document.
    *   **Predictive Pricing Engine (Reinforced):** This AI model, continuously trained on Bobby's entire historical dataset, will learn his unique, often intuitive pricing methodologies. It will then suggest an estimated total price for new jobs, aiming to match what Bobby *would* have charged.
    *   **Address-First Intelligence (Mapping & Property Data Integration):**
        *   **API Integration:** Seamlessly connects with Google Maps/Zillow (or similar geospatial data providers).
        *   **Automated Data Pull:** Upon entering a property address, the system will automatically pull and display satellite imagery, Street View, and basic property data (e.g., estimated square footage of a roof, number of stories), pre-populating relevant fields in the estimate to reduce manual measurement.
    *   **AI-Powered Photo & Document Analysis:**
        *   **Vision AI for Damage Suggestion:** Users can upload photos of job sites or specific damage. The Vision AI will analyze these images and suggest relevant line items for observed damage (e.g., "suggest cracked shingle repair," "suggest gutter replacement") directly into the proposal.
        *   **Historical Document Ingestion (Initial Setup):** This is the core functionality for *you*, Steven. It's a powerful backend utility (accessible via an admin interface, not Bobby's daily view) designed to ingest Bobby's existing emails, invoice files (Word docs, PDFs), and potentially even phone contacts. It will leverage advanced OCR and NLP to automatically extract all historical client data, service descriptions, and pricing information, populating the Master Service Library and the Client Database, and crucially, building the training data for the Predictive Pricing Engine. This is a one-time, potentially ongoing process that you can manage, ensuring the system becomes smarter over time without Bobby ever having to "do data entry."
    *   **Automated Email Drafting:** The system will automatically pre-populate the "To" field with the client's email (from the CRM), auto-generate the subject line (e.g., "227 Oak Street"), and insert the standard, professional email body used by Bobby ("Hi [Client Name], See attached estimate for your review. Please let me know if you have any questions. Thanks, Bob [Bobby's Number]").
    *   **One-Click Attachment:** The generated PDF proposal/invoice will be automatically attached to the drafted email.
    *   **One-Click Email Sending:** A single, clear button will allow Bobby to send the fully prepared email, minimizing friction.
    *   **Seamless Workflow:** This overarching principle ensures that Bobby fully reviews and approves any document before it is sent to a client. The system will guide him through logical steps, preventing accidental sends or unapproved changes.
    *   **Automated Client Follow-Up System (Optional - Advanced Toggle):** If enabled via the "Advanced Options" toggle, the system can automatically send polite reminder texts or emails to clients based on quote status (e.g., "Just checking in on the proposal for your roof at [Address]" after 5 days if no action is taken).

**V. Data Management & Integration Layer**

*   **Centralized Data Repository:** A robust and secure database will underpin the entire system, storing all client data, job details, service definitions, costings, and every generated document.
*   **External API Orchestration:** A dedicated layer will manage all integrations with third-party services (mapping, property data, supplier APIs, email/SMS gateways), handling authentication, rate limits, and data exchange.


---

### **Developer Onboarding Document: Welcome to the Bobby-Verse**

**Project Title:** The "Bobby-Vision" Intelligent Business Management System

**1. The "Why": A Journey into Digital Prehistory**

You're about to embark on a project that aims to drag a truly wonderful human being, Bobby, and his long-standing home improvement business out of what can only be described as the digital Stone Age. Currently, Bobby's operations are a masterclass in manual, inefficient, and frankly, baffling processes.

Imagine this: Every proposal, every invoice, every single client interaction is meticulously crafted by hand, one excruciating character at a time, in archaic Word documents that look like they were designed by a badger with a hangover. There's no standardized pricing, no customer database beyond Bobby's impressive (yet fallible) memory, and communication is handled by attaching these "documents" to the most boilerplate emails you've ever fucking seen. Materials are sourced with phone calls and guesswork. It's a goddamn artisanal nightmare of inefficiency.

The problem is simple: Bobby's drowning in manual labor, especially now that his business partner has tragically passed. He's working twice as hard just to maintain the status quo, and it's holding back a genuinely good man and a solid business. Your mission, should you choose to accept this glorious challenge, is to fundamentally revolutionize his entire operation.

**2. The "Who": Meet Bobby – Our Lovable Dumbass User**

Before you write a single line of code, you need to understand Bobby. He's not just a "user"; he's the central figure in this digital epic.

*   **Age:** Around 60 years old.
*   **Personality:** The nicest, most generous guy you'll ever meet. He's incredibly loyal, takes care of everyone around him, and is renowned for being an outrageously good tipper (think $20 cash for a $30 Uber ride). He lives in the same house he grew up in and isn't "loaded," just incredibly kind.
*   **Tech Acumen:** This is crucial. Bobby is, to put it gently, a technological marvel of ineptitude. He paid for AOL up until five years ago because he simply never canceled it. He still uses his AOL email. He genuinely misspelled "outlet" as "outlit." He sometimes leaves the sink running by accident.
*   **Workload:** Now running the entire business solo after his partner's sudden passing. He's doing double duty and desperately needs help, even if he doesn't fully grasp what "help" looks like in the digital realm.
*   **Key Insight:** He's not *stubbornly* resistant to new tech, but he's easily overwhelmed by complexity, too many options, or anything that feels "too different" from his established (albeit awful) habits. He needs magic that *feels* familiar, not a spaceship cockpit.

Our goal is not to replace Bobby's intuition or his personal touch; it's to **enhance his inherent genius** (especially his inexplicable pricing "magic" and memory for addresses) by offloading the tedious, repetitive, and error-prone crap. The system needs to be so intuitively powerful that it feels less like "software" and more like a supremely capable, silent assistant.

**3. The "What": An Overview of the Solution**

We're building an **Intelligent Business Management System** that will serve as Bobby's one-stop shop for everything related to client interaction, proposals, invoices, and material procurement. It will be a web application, accessible on any device, but meticulously designed with a mobile-first philosophy for Bobby's primary field use.

Its core purpose is to automate and intellectualize the entire workflow, moving from manual typing to natural language input, from guesswork to AI-powered insights, and from scattered memory to a centralized, self-building database. The system needs to be clean, visually appealing, and *simple* on the surface, while housing immensely powerful AI capabilities beneath.

**4. The "How" (High-Level Technical Approach - No Code):**

Think of this system as having a deceptively simple user interface layered over a complex, intelligent backend.

*   **Frontend (The User's Window):** A modern, responsive web application (likely using a contemporary JavaScript framework) that adapts seamlessly to desktop, tablet, and mobile screens. Its visual design will be clean and modern, **not** "for seniors" – think intuitive design that *everyone* finds easy, not just the elderly. A critical feature will be an **Adaptive Complexity Toggle**, allowing Bobby to switch between a brutally simple "Quick Quote" mode and a more detailed "Advanced Options" view, preventing cognitive overload.
*   **Backend (The Muscle & Brains):** A robust server-side application (e.g., Node.js, Python/Django, Ruby on Rails) that handles business logic, data storage, and orchestrates all the intelligent components. This will likely run on cloud infrastructure for scalability and reliability.
*   **Intelligence Layer (The Magic):** This is where AI/ML comes in. We'll leverage:
    *   **Natural Language Processing (NLP):** To understand Bobby's spoken/typed job descriptions.
    *   **Machine Learning (ML) Models:** To learn his historical pricing logic and predict prices.
    *   **Computer Vision (CV):** To analyze photos of job sites and suggest repair items.
    *   **Geospatial APIs:** For property data and location-based material sourcing.
*   **Data Management:** A secure, structured database will store all client, job, and service data.
*   **External Integrations:** APIs will connect to mapping services, email/SMS gateways, and critically, to local material suppliers (Home Depot, Lowe's, ABC Supply, etc.) for real-time inventory and pricing.

**5. Expectations & Your Role:**

This project is not just about writing code; it's about solving real-world, deeply entrenched inefficiencies for a genuinely good person. Your meticulous attention to detail, adherence to the functional specifications (which follow this document), and your understanding of Bobby's unique needs will be paramount. We need your expertise to bring this vision to life.

This FSD is your bible. Read it. Live it. Make Bobby's life easier, and you will be a goddamn hero.

---

Now, for the main event, the **Functional Specification Document**. This is where we break down every single fucking feature you listed, Steven, into the granular detail needed to build this masterpiece. This will be exhaustive, leaving no room for misinterpretation.

---

### **Functional Specification Document (FSD): The "Bobby-Vision" System**

**Version:** 1.0
**Date:** July 14, 2025
**Author:** Steven's Brain (via Gemini)

**I. Core System Philosophy & User Interface Design**

This section defines the fundamental design principles and the user experience (UX) framework, ensuring the system is both powerful and incredibly user-friendly for Bobby.

1.  **User Experience (UX) Principles:**
    *   **Objective:** Create an interface that feels modern and intuitive ("cool") while maintaining extreme simplicity to avoid overwhelming Bobby.
    *   **Visual Design:**
        *   **Aesthetics:** Clean, contemporary visual design. Utilizes ample whitespace, legible modern typography (no high-contrast, "elderly" specific design, but clear legibility is paramount). A refined, harmonious color palette will be used.
        *   **Clutter Reduction:** Information is presented contextually, minimizing on-screen clutter. Only essential elements for the current task are visible in the "Simple View."
    *   **Interaction Design:**
        *   **Large Touch Targets:** Buttons and interactive elements will be generously sized for easy tapping on mobile devices (critical for Bobby's field use).
        *   **Minimizing Text Input:** Where possible, leverage voice input, auto-completion, and selection from pre-populated lists to reduce manual typing.
        *   **Clear Feedback:** Provide immediate visual or auditory feedback for user actions (e.g., successful save, item added).
    *   **Mobile-Centricity:** The UI/UX will be optimized for primary use on mobile devices (smartphones, tablets), with seamless responsiveness to desktop environments. This means fluid layouts, touch-first interactions, and efficient use of screen real estate for field operations.

2.  **Adaptive Complexity Toggle:**
    *   **Purpose:** To provide a single, prominent, and easily discoverable control that allows Bobby to switch between a streamlined "Simple View" and a more feature-rich "Advanced Options" view. This ensures he is never overwhelmed but always has access to deeper functionality.
    *   **Mechanism:** A persistent toggle or button (e.g., "Quick Quote" / "Detailed Estimate" or a simple "Advanced Options" switch) visible across relevant sections of the application.
    *   **"Simple View" (Default for Bobby):**
        *   **Functionality:** Designed for rapid estimate generation and basic client management.
        *   **Hidden Features:** All profitability metrics, detailed service attributes, material costing, historical performance tracking, and granular configuration options are concealed.
        *   **Workflow:** Optimized for the core "natural language input -> price prediction -> send email" flow.
    *   **"Advanced Options" View (For Deeper Use):**
        *   **Functionality:** Reveals all advanced features and granular controls.
        *   **Target User:** Primarily for Bobby when he wants to dive deeper, or for your involvement in initial setup/management.
        *   **Visibility:** Features like the Profitability Slider, Live Material Costing, detailed Historical Performance data, and granular Service Attributes become visible and interactive.

**II. Document Creation & Management Module**

This module handles the core functionality of generating, organizing, and converting all types of business documents.

1.  **Multi-Type Document Generation:**
    *   **Functionality:** The system will support the creation of three primary document types, each with its own specific workflow and content requirements.
    *   **Document Types:**
        *   **Proposals / Estimates:**
            *   **Purpose:** The primary pre-sales document detailing the scope of work and predicted cost.
            *   **Content:** Must include Bobby's company header ("T. Paris Home Improvements" or "T. Paris Roofing"), client details, property address, itemized service list, total predicted cost, and standard disclaimer/contact info.
            *   **Initial State:** Begins as a "Draft" status.
        *   **Optional Post-Completion Invoices:**
            *   **Purpose:** Documents for billing clients after job completion.
            *   **Content:** Inherits from the associated Proposal. Includes invoice number, date, client details, itemized services, final total amount.
            *   **Status Tracking:** Ability to mark as "Issued," "Paid In Full," "Overdue."
        *   **Descriptive Reports (e.g., "Roof Inspection"):**
            *   **Purpose:** Non-financial professional assessment documents.
            *   **Content:** Includes Bobby's company header, client/property details, a narrative description of findings, observations, and recommendations. *Crucially, these documents will **not** have a "Total" price field.*
            *   **Use Case:** Ideal for initial property assessments or follow-up reports without billing.
    *   **Process:** User selects desired document type at the initiation of a new job.

2.  **Modular Project Structure:**
    *   **Functionality:** Enables the organization of complex projects into manageable, distinct sub-sections or for managing multiple properties/units under a single client.
    *   **Sub-Job Segmentation:**
        *   **Creation:** Within a single Proposal or Invoice, users can define distinct sub-jobs (e.g., "Kitchen," "Basement," "Master Bath," "Exterior").
        *   **Line Item Association:** Each service line item will be assignable to a specific sub-job.
        *   **Sub-Totaling:** Each defined sub-job will automatically calculate and display its own sub-total, with a grand total for the entire document.
        *   **Visual Representation:** Sub-jobs will be clearly delineated in the generated document (e.g., via bolded headings or distinct sections).
    *   **Client-Centric Job Nesting (for Property Management):**
        *   **Master Client:** The system allows for a "master client" entity (e.g., "The Meadows").
        *   **Nested Projects:** Individual proposals/invoices for specific units or buildings (e.g., "Unit 3712," "2400 Building") can be nested and accessed directly from the master client's profile in the CRM. This provides a comprehensive overview for property management companies.

3.  **One-Click Invoice Conversion:**
    *   **Functionality:** Streamlines the process of turning an approved Proposal into an Invoice.
    *   **Trigger:** A prominent "Convert to Invoice" action button on the Proposal detail screen.
    *   **Process:**
        1.  Upon activation, the system copies all relevant data from the Proposal to a new Invoice record.
        2.  The Invoice is automatically assigned a unique Invoice ID.
        3.  The Proposal's status is updated (e.g., "Converted to Invoice").
        4.  The new Invoice document is generated and presented for review, with the ability to adjust if necessary before sending.
    *   **Status Management:** Invoices will have tracking capabilities: "Pending Payment," "Paid In Full," "Overdue."

4.  **Automated PDF Conversion:**
    *   **Functionality:** All generated documents (Proposals, Invoices, Reports) will be automatically converted to universally readable PDF format.
    *   **Trigger:** Automatically initiated upon document creation or conversion.
    *   **Output:** High-quality, print-ready PDF files.
    *   **File Naming Convention:** Automatically names the PDF file based on the property address and document type (e.g., "123MainSt_Proposal.pdf," "456ElmAve_Invoice.pdf").

**III. Service & Pricing Engine Module**

This module defines how services are managed, configured, and how pricing is determined and analyzed within the system.

1.  **Master Service Library:**
    *   **Functionality:** A centralized, editable database of all services Bobby offers, effectively acting as his internal SKU list.
    *   **Pre-Population:** Upon initial setup, the library will be intelligently pre-populated by parsing Bobby's existing historical invoices and proposals (via the Historical Document Ingestion feature).
    *   **Service Definition:** Each service entry will include:
        *   Unique Service ID/Name (e.g., "Rip Roof to Wood," "Install 30-Year Shingles").
        *   Default description for document generation.
        *   Estimated base material cost (backend only, for profitability calculations).
        *   Estimated base labor cost (backend only, for profitability calculations).
        *   Associated configurable attributes (if any).
    *   **Dynamic Addition:** Users can add new, custom line items or services to the Master Service Library directly from a proposal or via a dedicated administration interface. This ensures the system evolves with Bobby's business.

2.  **Configurable Service Attributes:**
    *   **Functionality:** Allows for specifying variations and options for a given service.
    *   **Attribute Definition:** For each service in the Master Service Library, administrators can define specific attributes (e.g., for "Install Gutter": "Size" as a dropdown with options `5"`, `6"`; for "Material": dropdown with `Aluminum`, `Copper`, `Vinyl`).
    *   **Impact:** Selecting an attribute option may dynamically adjust the backend material/labor costs associated with that service item, feeding into the profitability calculator.

3.  **Toggles for Common Variables:**
    *   **Functionality:** Simple, binary switches that can be applied to individual line items to account for common, impactful variables.
    *   **Examples:**
        *   `[ ] Customer-Supplied Material`: If checked, the system accounts for this in the profitability calculation (e.g., reduces material cost for that item to zero).
        *   `[ ] Complex Installation`: If checked, this could increase the estimated labor cost or flag for specific attention in the backend.
    *   **User Interface:** Presented as clear checkboxes or simple on/off toggles adjacent to the relevant line item on the proposal creation screen.

4.  **Real-Time Profitability Calculator:**
    *   **Functionality:** Provides immediate financial insights into each proposed job, calculated dynamically as line items and parameters are added or adjusted.
    *   **Backend Cost Entry:** For each service item in the Master Service Library, administrators can input backend material and labor costs. These are internal figures, never shown to the client.
    *   **Live Calculation:** As services are added to a proposal, the system will calculate and display:
        *   **Total Estimated Cost:** The sum of all backend material and labor costs for the proposed work.
        *   **Gross Profit:** The difference between the quoted client price and the total estimated cost.
        *   **Profit Margin:** Gross Profit as a percentage of the quoted client price.
    *   **Profitability Slider (Advanced Option):**
        *   **Visibility:** Only available when the "Advanced Options" toggle is active.
        *   **Mechanism:** A visual slider that allows Bobby to adjust the proposed total price for a project. As he moves the slider, the system dynamically updates the Gross Profit and Profit Margin, showing the impact of pricing adjustments on profitability. This enables strategic pricing decisions, balancing competitiveness with desired margins.

5.  **Live Material Costing & Sourcing Module (The "Smart Procurement" Sub-Module):**
    *   **Functionality:** A separate, dedicated workflow for managing and procuring materials, designed to be accessed *independently* from initial proposal generation to avoid overwhelming Bobby.
    *   **Access:** Accessible via a prominent button on a job's detail screen (e.g., "Order Materials for this Job") or through a dedicated "Materials & Sourcing" section in the main navigation.
    *   **API Hooks to Major Local Suppliers:**
        *   **Integration:** Direct, programmatic API integrations with major home improvement and building material suppliers serving the Bellmore, New York, 11710 area (e.g., Home Depot, Lowe's, ABC Supply, etc.).
        *   **Data Exchange:** Enables real-time querying for product availability, pricing, and potential order placement.
    *   **AI-Driven Material Quantity Estimation:**
        *   **Logic:** Leveraging the AI's understanding of services (from Master Service Library) and project scope (e.g., square footage from Address-First Intelligence), the system will estimate the required quantities of specific materials for the job. (e.g., "Install 30-year shingles on 1500 sq ft roof" -> X bundles of shingles, Y rolls of felt).
        *   **Presentation:** The AI-generated material list will be presented to Bobby.
    *   **Selective Material Purchase:**
        *   **User Control:** Bobby will see the AI-suggested material list. Each item will have a simple checkbox or toggle, allowing him to easily uncheck items he does not need to purchase (e.g., materials he already has in stock, or those sourced from a non-integrated supplier).
        *   **Purpose:** Ensures the sourcing process only focuses on what's genuinely required.
    *   **Optimized Sourcing Recommendations:**
        *   **Criteria:** For the selected materials, the system will query the integrated supplier APIs and present a ranked list of "best options" based on a configurable hierarchy of criteria.
        *   **Ranking Factors:**
            *   **Availability/Stock:** Prioritizes suppliers with materials currently in stock.
            *   **Price:** Displays the lowest price for the required quantity across suppliers.
            *   **Distance:** Calculates and displays the driving distance from a user-selected origin point to each supplier location.
        *   **Origin Point Selection:** Bobby can choose whether to calculate distance from:
            *   **His Current Location (via device GPS):** Ideal when he's on the go.
            *   **The Job Site Location:** Ideal for direct delivery or crew pickups.
    *   **Direct Order Placement for Pickup (Optional):**
        *   **Functionality:** If a supplier's API supports it, Bobby will have the option to place an order for **pickup** directly from within the system.
        *   **Workflow:** User selects desired supplier/location, confirms order details, and initiates the purchase. The system provides confirmation and pickup details.
        *   **Intuitive Separation:** This functionality will be clearly distinct from the proposal generation workflow, ensuring Bobby interacts with it only when actively managing material procurement.

**IV. Client & Business Management (CRM) Module**

This module centralizes client data and historical interactions, turning Bobby's mental database into a structured, searchable asset.

1.  **Centralized Customer Database:**
    *   **Functionality:** Automatically builds and maintains a comprehensive client database without requiring manual data entry from Bobby.
    *   **Auto-Creation from Proposals:** Whenever a new proposal or invoice is generated for a client, a client profile is either created (if new) or updated (if existing).
    *   **Stored Data:** Each client profile will store:
        *   Client Name
        *   Primary Contact Information (Phone, Email – automatically extracted)
        *   Primary Address(es) associated with past jobs.
        *   Payment Terms (if applicable, for invoices).
        *   Any other relevant notes manually added by Bobby or your mom.
    *   **Purpose:** Eliminates Bobby's reliance on memory for contact details and job history.

2.  **Searchable Client & Job History:**
    *   **Functionality:** Provides quick, intuitive search capabilities to locate clients and their associated job histories.
    *   **Search Criteria:** Users can search by client name, property address, or job ID/description keywords.
    *   **Client Profile View:** Upon selecting a client, a dedicated profile screen displays:
        *   All stored contact information.
        *   A chronological list of every associated proposal, invoice, and report.
        *   Each entry in the job history will be clickable, leading directly to the full document.
    *   **Purpose:** Enables immediate recall of past work, pricing, and client interactions.

3.  **Historical Performance Tracking (Advanced Option):**
    *   **Functionality:** Analyzes the stored job history to provide insights into Bobby's business performance and advise on pricing strategy.
    *   **Visibility:** Only available when the "Advanced Options" toggle is active.
    *   **Analysis:**
        *   **Profitability Trends:** Identifies average profit margins for different service types or project sizes.
        *   **Common Service Combinations:** Highlights frequently bundled services.
        *   **Successful Quote Rates:** Tracks the percentage of proposals that convert into accepted jobs.
        *   **Pricing Advisories:** Based on historical data, the system can provide high-level advisories (e.g., "Projects of this scope typically have a 25% margin," or "Your conversion rate for roof repairs is highest when quoting within X price range"). These are suggestions, not mandates, to inform Bobby's intuition.

**V. Intelligence & Automation Module**

This is the heart of the "galaxy brain," where AI transforms manual effort into effortless magic.

1.  **Natural Language Job Input:**
    *   **Functionality:** The primary method for initiating new proposals or reports.
    *   **Input Methods:** Supports both:
        *   **Voice Input:** Via microphone (leveraging standard device speech-to-text capabilities).
        *   **Text Input:** Via a simple, large text field.
    *   **User Flow:** Bobby (or your mom) simply describes the job as they would to another person: "Start a proposal for a new roof for Sherry at 123 Fake Street," or "We need to demo walls in the back room at 227 Oak Street and install a sliding glass door."

2.  **Intelligent Detail Parsing:**
    *   **Functionality:** Utilizes Natural Language Processing (NLP) to extract all meaningful entities and details from the unstructured natural language input.
    *   **Extraction Targets:**
        *   Client Name (e.g., "Sherry," "James Levine").
        *   Property Address (e.g., "123 Fake Street," "227 Oak Street").
        *   Core Services Requested (e.g., "new roof," "demo walls," "install sliding glass door").
        *   Specific Materials/Attributes (e.g., "30-year shingles," "6-inch gutter").
        *   Quantities/Dimensions (e.g., "2500 sq ft roof," "3 sheets of plywood").
        *   Contextual Notes (e.g., "gutter repair on the south side").
    *   **Output:** Structured data fields populated automatically for the proposal/report.

3.  **AI-Driven Service Itemization:**
    *   **Functionality:** Based on the parsed details, the AI intelligently selects and adds the most relevant service line items from the Master Service Library to the new proposal.
    *   **Process:** If the natural language input mentions "rip roof down to wood" and "install 30 year shingles," the AI automatically suggests these as discrete line items, pre-populated with standard descriptions and base costs.
    *   **User Review:** The suggested line items are presented to Bobby for confirmation and manual adjustment (adding, removing, editing).

4.  **Contextual/Dynamic Service Descriptions (Optional):**
    *   **Functionality:** When enabled (potentially via "Advanced Options" or a global setting), the AI can generate concise, professional 1-sentence descriptions for each service item on the document.
    *   **Adaptation:** These descriptions will be dynamically adapted based on the specific job details parsed (e.g., "Install new vinyl sliding glass door to be raised" could become "Installation of a new Andersen vinyl sliding glass door, precisely adjusted for the raised opening").
    *   **Purpose:** Enhances the professionalism and clarity of the proposals without extra effort from Bobby.

5.  **Predictive Pricing Engine (Reinforced):**
    *   **Functionality:** The core AI capability that learns Bobby's unique, often intuitive pricing logic and suggests a total price for new jobs.
    *   **Training Data:** The AI model will be rigorously trained on Bobby's entire historical dataset of proposals and invoices (parsed and ingested via the Historical Document Ingestion feature). This includes understanding how he combines services, materials, and scope to arrive at his final prices.
    *   **Output:** Presents a predicted total price (and potentially a small range) for the entire job the moment the service items are confirmed.
    *   **User Control:** Bobby retains the ultimate authority to accept the suggested price or manually adjust it, with the profitability calculator providing immediate feedback.

6.  **"What If" Pricing Scenario Simulation (Reinforced):**
    *   **Functionality:** Allows Bobby to instantly model the financial impact of changes to a proposal.
    *   **Mechanism:** On the proposal creation screen, Bobby can adjust key parameters (e.g., "increase roof size by 500 sq ft," "change to premium shingles," "remove gutter repair").
    *   **Real-Time Update:** The system, leveraging the Predictive Pricing Engine, will immediately recalculate and display the new predicted total price, estimated cost, and profit margins.

7.  **Address-First Intelligence (Mapping & Property Data Integration):**
    *   **Functionality:** Initiates the job creation process by leveraging a property address to gather relevant external data.
    *   **API Integration:** Seamlessly connects with Google Maps, Zillow, or other reliable geospatial data providers.
    *   **Automated Data Pull:** When an address is entered (or parsed from natural language input), the system automatically pulls:
        *   **Satellite Imagery:** For visual confirmation of the property.
        *   **Street View:** For ground-level visual inspection.
        *   **Basic Property Data:** Such as estimated building footprint, roof square footage, number of stories, and potentially roof pitch (where available and reliable).
    *   **Pre-population:** Automatically pre-fills relevant fields in the proposal (e.g., "Roof Area" with estimated sq footage), reducing manual data entry and improving accuracy.

8.  **AI-Powered Photo & Document Analysis:**
    *   **Vision AI for Damage Suggestion:**
        *   **Functionality:** Allows Bobby to upload photos directly from his mobile device.
        *   **Analysis:** A Computer Vision (CV) model analyzes the uploaded image to identify common types of damage or required repairs (e.g., "broken shingles," "deteriorated fascia," "clogged gutters").
        *   **Line Item Suggestion:** The system then suggests relevant service line items (from the Master Service Library) based on the visual analysis, which Bobby can accept or reject.
    *   **Historical Document Ingestion (Initial Setup/Admin Function):**
        *   **Purpose:** This is a crucial, high-powered backend utility designed for *Steven* to use during the system's setup and ongoing refinement. Bobby will never directly interact with this.
        *   **Functionality:**
            *   **OCR (Optical Character Recognition):** Extracts text from scanned images of Bobby's old paper invoices or PDF attachments.
            *   **NLP for Data Extraction:** Processes the extracted text to identify and categorize client names, addresses, service descriptions, quantities, and prices from his historical "cave drawing" documents and emails.
            *   **Database Population:** Automatically populates the Master Service Library with unique services/SKUs and their associated costs, and builds/updates the Centralized Customer Database with historical client info and job records.
            *   **AI Training Data Generation:** This process generates the clean, structured dataset required to train the Predictive Pricing Engine and other AI models, making the system "learn" Bobby's business.
        *   **Access:** Accessible only via an administrative interface or a dedicated import tool, not part of Bobby's standard operational workflow. This ensures that the system becomes intelligent without Bobby needing to perform any tedious data entry for past jobs.

9.  **Automated Email Drafting:**
    *   **Functionality:** Automates the creation of the standard email used for sending proposals and invoices.
    *   **Auto-Population:**
        *   **"To" Field:** Automatically populated with the client's email address (pulled from the CRM).
        *   **"Subject" Line:** Automatically generated based on the property address (e.g., "227 Oak Street" or "1750 Stevens Avenue"), matching Bobby's current convention.
        *   **Email Body:** The system will automatically insert Bobby's standard message: "Hi [Client Name], See attached [estimate/invoice] for your review. Please let me know if you have any questions. Thanks, Bob [Bobby's Phone Number]."

10. **One-Click Attachment & Sending:**
    *   **Functionality:** Streamlines the final steps of delivering the document to the client.
    *   **One-Click Attachment:** The generated PDF document is automatically attached to the drafted email with a single, system-initiated action.
    *   **One-Click Email Sending:** A clear, prominent button (e.g., "Send Proposal") allows Bobby to dispatch the fully prepared email with a single tap, minimizing any complex steps.

11. **Seamless Workflow & Approval:**
    *   **Functionality:** Ensures that Bobby maintains control and actively approves documents before they are sent to clients.
    *   **Approval Gate:** Before the "One-Click Email Sending" action is enabled, the system will require a clear confirmation or approval step from Bobby, ensuring he reviews the document and the drafted email.
    *   **Guidance:** The interface will visually guide Bobby through the logical steps from creation to sending, making the process intuitive and error-proof.

12. **Automated Client Follow-Up System (Optional - Advanced Toggle):**
    *   **Functionality:** Automates follow-up communications to clients based on the status of their quotes.
    *   **Visibility:** Only available when the "Advanced Options" toggle is active.
    *   **Configuration:** Your mom (or Bobby, if he chooses to explore) can configure:
        *   **Trigger Events:** E.g., "5 days after proposal sent, if no response."
        *   **Communication Channel:** Email or SMS (if SMS gateway integrated).
        *   **Message Templates:** Pre-written, customizable follow-up messages (e.g., "Just checking in on the proposal for your roof at [Address]. Let me know if you have any questions! - Bob").
    *   **Purpose:** Nudges clients automatically, saving Bobby the effort of manual follow-ups.

**VI. Data Management & Integration Layer**

This layer defines how data is stored, accessed, and how the system interacts with external services.

1.  **Centralized Data Repository:**
    *   **Architecture:** A robust and secure database (e.g., a SQL database like PostgreSQL or MySQL) will serve as the single source of truth for all system data.
    *   **Data Models (High-Level):**
        *   **Clients:** Stores client names, contact info, associated addresses, and pointers to their job histories.
        *   **Jobs/Projects:** Stores high-level job details, associated client, current status, final totals, and pointers to individual documents.
        *   **Documents:** Stores the full content of proposals, invoices, and reports.
        *   **Service Library:** Stores all defined services, their attributes, costs, and descriptions.
        *   **Materials:** Stores material types, unit costs, and supplier info.
        *   **Users:** Stores user credentials and role (for multi-user if ever expanded, but currently just Bobby's implied profile).
    *   **Security:** Data will be encrypted at rest and in transit. Access controls will be strictly enforced.

2.  **External API Orchestration:**
    *   **Functionality:** A dedicated service layer responsible for managing all interactions with third-party APIs.
    *   **API Types:**
        *   **Mapping & Property Data APIs:** (e.g., Google Maps Platform, Zillow API) for address validation, geospatial data, and property imagery.
        *   **Supplier APIs:** (e.g., Home Depot, Lowe's, ABC Supply) for real-time inventory, pricing, and order placement.
        *   **Email Gateway API:** For sending all system-generated emails.
    *   **Management:** Handles API key management, rate limiting, error handling, and robust logging of all external calls.


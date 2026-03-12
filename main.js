/* ===================================================
   GROWTH OS — MAIN JS
   Dark premium interactive layer
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── Reading Progress Bar ─── */
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const total = document.body.scrollHeight - window.innerHeight;
            const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }, { passive: true });
    }

    /* ─── Navbar Scroll Effect ─── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    /* ─── Sticky CTA ─── */
    const stickyCta = document.getElementById('sticky-cta');
    if (stickyCta) {
        const hero = document.querySelector('.hero');
        const observer = new IntersectionObserver(([entry]) => {
            stickyCta.classList.toggle('visible', !entry.isIntersecting);
        }, { threshold: 0 });
        if (hero) observer.observe(hero);
    }

    /* ─── Mobile Menu ─── */
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('nav-mobile');
    if (hamburger && navMobile) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMobile.classList.toggle('open');
        });
        // close on link click
        navMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMobile.classList.remove('open');
            });
        });
    }

    /* ─── Scroll Animations (Intersection Observer) ─── */
    const animatedEls = document.querySelectorAll('[data-animate]');
    if (animatedEls.length) {
        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    animObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

        animatedEls.forEach(el => animObserver.observe(el));

        // Immediately trigger elements already in viewport
        requestAnimationFrame(() => {
            animatedEls.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add('in-view');
                }
            });
        });
    }

    /* ─── Demo Tabs ─── */
    const tabBtns = document.querySelectorAll('.demo-tab-btn');
    const tabPanels = document.querySelectorAll('.demo-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(`tab-${targetTab}`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    /* ─── FAQ Accordion ─── */
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // close all
            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
            });

            // open clicked if was closed
            if (!isOpen) item.classList.add('open');
        });
    });

    /* ─── Newsletter Form ─── */
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');
    if (newsletterForm && newsletterSuccess) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.style.opacity = '0.4';
            setTimeout(() => {
                newsletterForm.style.display = 'none';
                newsletterSuccess.style.display = 'block';
            }, 400);
        });
    }

    /* ─── Waitlist Form ─── */
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = waitlistForm.querySelector('.form-submit');
            if (btn) {
                btn.textContent = '✓ Application received!';
                btn.disabled = true;
                btn.style.opacity = '0.6';
            }
        });
    }

    /* ─── Category Tab Filtering (University & Blog) ─── */
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const container = tab.closest('section') || document.body;
            container.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Cards visibility toggle
            const cat = tab.dataset.category;
            if (cat && cat !== 'all') {
                document.querySelectorAll('[data-category]').forEach(card => {
                    card.style.display = card.dataset.category === cat ? '' : 'none';
                });
            } else {
                document.querySelectorAll('[data-category]').forEach(card => {
                    card.style.display = '';
                });
            }
        });
    });

    /* ─── Smooth Scroll for anchor links ─── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ─── Causal AI Chart.js Initialization ─── */
    const chartCtx = document.getElementById('incrementalityChart');
    if (chartCtx) {
        // Data Arrays
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const actualRevenue = [80000, 88000, 92000, 102000, 115000, 118000, 128000, 132000, 148000, 152000, 168000, 175000];
        const baselineProjection = [60000, 62000, 65000, 64000, 68000, 65000, 68000, 70000, 72000, 71000, 74000, 73000];

        // Chart gradient
        const ctx = chartCtx.getContext('2d');
        const gradientFill = ctx.createLinearGradient(0, 0, 0, 240);
        gradientFill.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
        gradientFill.addColorStop(1, 'rgba(6, 182, 212, 0)');

        new Chart(chartCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Actual Revenue',
                        data: actualRevenue,
                        borderColor: '#3B82F6', // accent blue
                        backgroundColor: '#3B82F6',
                        borderWidth: 2,
                        pointBackgroundColor: '#000',
                        pointBorderColor: '#3B82F6',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.4,
                        fill: false,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Baseline Projection',
                        data: baselineProjection,
                        borderColor: 'rgba(255, 255, 255, 0.2)', // muted baseline
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        tension: 0.4,
                        fill: {
                            target: 0,
                            above: gradientFill
                        },
                        yAxisID: 'y'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: false // Custom legend is built in HTML
                    },
                    tooltip: {
                        backgroundColor: '#1a1a1a',
                        titleColor: '#fff',
                        bodyColor: 'rgba(255, 255, 255, 0.7)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        boxPadding: 6,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(context.parsed.y);
                                }
                                return label;
                            },
                            afterBody: function(tooltipItems) {
                                if(tooltipItems.length === 2) {
                                    const actual = tooltipItems[0].parsed.y;
                                    const baseline = tooltipItems[1].parsed.y;
                                    const lift = actual - baseline;
                                    const formattedLift = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(lift);
                                    return `\nIncremental Lift: +${formattedLift}`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.4)',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.4)',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 11
                            },
                            callback: function(value) {
                                return '$' + value / 1000 + 'k';
                            }
                        },
                        beginAtZero: false,
                        suggestedMin: 50000
                    }
                }
            }
        });
    }

});
